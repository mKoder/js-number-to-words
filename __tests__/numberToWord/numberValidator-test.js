'use strict';

jest.unmock('../../src/components/numberValidator/numberValidator.js');
import validator from '../../src/components/numberValidator/numberValidator.js';

describe('numberValidator', function () {

    describe('getValidIntegerFromString', function() {

        it('should return false if outside the valid range', function() {

            expect(validator.getValidIntegerFromString('100',0,99)).toEqual(false);
        });

        it('should return an integer if valid', function() {

            expect(Number.isInteger(validator.getValidIntegerFromString('99',0,100))).toEqual(true);
        });

    });

    describe('isInteger', function() {

        it('should return false when trying to use leading zeros', function() {

            expect(validator.isStringValueValidInteger('001')).toEqual(false);
        });

    });

});
