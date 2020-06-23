import { legologger } from '..';

test('Start logger', () => {
  legologger.start({
    debugCommand: false,
    debugEventArguments: false,
    debugEvents: false,
    debugGuards: false,
    debugRedundantEventFlag: false,
    excludedEvents: [''],
    fontFamily: 'Arial',
    fontSize: 10,
    padding: 2,
  });
});
