'use strict';

jest.unmock('../../src/components/numberToWords/numberToWords.js');
import numberToWords from '../../src/components/numberToWords/numberToWords.js';

describe('numberToWords', function () {

    describe('convertNumberGreaterThan100', function() {

        it('should correctly covert 100 + teen numbers ', function() {

            expect(numberToWords.convertNumberGreaterThan100('113')).toEqual('one hundred and thirteen');
        });

    });

});
