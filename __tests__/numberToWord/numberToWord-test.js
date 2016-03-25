'use strict';

jest.unmock('../../src/components/numberToWords/numberToWords.js');
import numberToWords from '../../src/components/numberToWords/numberToWords.js';

describe('numberToWords', function () {

    describe('convertNumberGreaterThan100', function() {

        it('should correctly covert 100 + teen numbers ', function() {

            expect(numberToWords.convertNumberGreaterThan100('113')).toEqual('one hundred and thirteen');
        });

    });

    describe('splitNumberIntoChunks', function() {

        it('should convert a large number into groups of thousands', function() {

            expect(numberToWords.splitNumberIntoChunks(1000)).toEqual([0,1]);
        });

    });

    describe('convert', function() {

        it('should correctly convert a thousand number and a single', function() {

            expect(numberToWords.convert(1001)).toEqual('One thousand and one');
        });

        it('should not add a trailing comma where n % 1000 = 0', function() {

            expect(numberToWords.convert(1000)).toEqual('one thousand');
            expect(numberToWords.convert(1000000)).toEqual('one million');
            expect(numberToWords.convert(10000000)).toEqual('ten million');
        });

    });

});
