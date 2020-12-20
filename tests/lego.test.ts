import { lego } from '@armathai/lego';
import { legologger } from '../src';

test('Start logger', () => {
    legologger.start(lego, {
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
