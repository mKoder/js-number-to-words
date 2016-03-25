'use strict';

class numberValidator {

    /**
     * Returns an integer from a string, given a valid
     * range
     *
     * @param numString
     * @returns {*}
     */
    static getValidIntegerFromString(numString, rangeMin=0, rangeMax=0) {

        if(numberValidator.isStringValueValidInteger(numString)) {

            let number = parseInt(numString);

            if((rangeMax > 0) && (number >= rangeMin && number <= rangeMax) || (rangeMax == 0)) {
                return number;
            }

        }

        return false;
    }

    /**
     * Checks whether a string is an integer and
     * doesn't have leading zeros. We check for
     * leading zeros as parseInt will convert
     * a string with leading zeros but for this
     * app we've chosen to not accept them
     *
     * @param number
     * @returns {boolean}
     */
    static isStringValueValidInteger(number) {

        let leadingZerosRegex = /^0[0-9].*$/;
        let intRegex = /^\d+$/;

        if(intRegex.test(number) && !leadingZerosRegex.test(number)) {
            return true;
        }

        return false;
    }

}

export default numberValidator;