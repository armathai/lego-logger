import { ICommand, IGuard, lego } from '@armathai/lego';
import { IDebugConfig } from './Types';

export class Logger {
  private _event = lego.event;
  private _command = lego.command;
  private _config!: IDebugConfig;
  private _gap: number = 0;

  public start(debugConfig: IDebugConfig): void {
    const { event, command } = lego;
    this._event = event;
    this._command = command;
    this._config = this._getConfig(debugConfig);

    this._patchEvents().patchCommands();
  }

  private _patchEvents(): this {
    const originalEmit = this._event.emit.bind(this._event);
    const { debugEvents, excludedEvents } = this._config;

    if (debugEvents) {
      this._event.emit = (name: string, ...args: any[]) => {
        if (excludedEvents?.length && excludedEvents.indexOf(name) !== -1) {
          return originalEmit(name, ...args);
        }

        this._gap += 1;
        this._debugEmit(name, ...args);
        const emitResult = originalEmit(name, ...args);
        this._gap -= 1;

        return emitResult;
      };
    }

    return this;
  }

  private patchCommands(): this {
    const { debugCommand, debugGuards } = this._config;

    if (debugCommand) {
      // @ts-ignore
      const originalPrivateExecute = this._command._execute.bind(this._command);
      // @ts-ignore
      this._command._execute = (command: ICommand, ...args: any[]) => {
        this._gap += 1;
        this._debugCommand(command);
        const executeResult = originalPrivateExecute(command, ...args);
        this._gap -= 1;

        return executeResult;
      };

      const originalPublicExecute = this._command.execute.bind(this._command);
      this._command.execute = (...commands: ICommand[]) => {
        // @ts-ignore
        if (debugGuards && this._command._guards.length) {
          this._gap += 1;
          this._debugGuards(commands);
          this._gap -= 1;
        }

        return originalPublicExecute(...commands);
      };
    }

    return this;
  }

  private _getStyle(background: string, color: string): string {
    const { fontSize, padding, fontFamily } = this._config;
    return `background: ${background}; color: ${color}; font-size: ${fontSize}px; font-family: "${fontFamily}"; font-weight: bold; padding: ${padding}px;`;
  }

  private _debugEmit(event: string, ...args: any[]): void {
    const { debugEventArguments, debugRedundantEventFlag } = this._config;

    const logStyle = [this._getStyle('#C3E6CB', '#000000')];

    let message = `${this._getSpace()}%c ${event} `;

    if (debugEventArguments && args.length > 0) {
      logStyle.push(this._getStyle('#BDE5EB', '#000000'));
      const argsMsg = args.reduce((msg, arg: unknown, index) => {
        logStyle.push(this._getStyle(index % 2 === 0 ? '#FDFDFE' : '#C6C8CA', '#000000'));
        return (msg += `%c  ${arg} `);
      }, '');
      message += `%c  \u21E8  ${argsMsg}`;
    }

    if (debugRedundantEventFlag) {
      const listeners = this._event.getListeners(event);
      if (listeners.length === 0) {
        logStyle.push(this._getStyle('#FFEEBA', '#000000'));
        message += `%c ⚠️`;
      }
    }

    this._log(message, ...logStyle);
  }

  private _debugGuards(commands: ICommand[]): void {
    // @ts-ignore
    const { _guards, _payloads } = this._command;
    const notPassedGuard = _guards.find((guard: IGuard) => !guard.apply(undefined, _payloads));
    const passed = !notPassedGuard;

    commands.forEach((command, index) => {
      const logStyle = [this._getStyle('#D6D8DB', '#000000')];
      let message = `${this._getSpace()}%c ${command.name} `;
      for (const guard of _guards) {
        logStyle.push(this._getStyle('#FDFDFE', '#000000'));
        message += `%c ${guard.name} `;
        if (guard === notPassedGuard) {
          message += ` 🛑 `;
          break;
        } else {
          message += ` ✅ `;
        }
      }
      if (!passed) {
        logStyle[0] = logStyle[0] + ' text-decoration: line-through;';
      }
      this._log(message, ...logStyle);
    });
  }

  private _debugCommand(command: () => void): void {
    this._log(`${this._getSpace()}%c ${command.name} `, this._getStyle('#B8DAFF', '#000000'));
  }

  private _getSpace(): string {
    return this._gap === 0 ? '' : ' '.repeat(this._gap - 1);
  }

  private _log(value: string, ...args: any[]): void {
    console.log(value, ...args);
  }

  private _getConfig(rawConfig: IDebugConfig): IDebugConfig {
    const defaults = {
      debugGuards: true,
      debugCommand: true,
      debugEventArguments: true,
      debugRedundantEventFlag: true,
      debugEvents: true,
      fontSize: 12,
      excludedEvents: [''],
      padding: 1,
      fontFamily: 'Arial',
    };

    return Object.assign(defaults, rawConfig);
  }
}
