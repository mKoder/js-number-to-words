class numberToWords {

    constructor() {

         this.oneToNineteen = [
            "", "one", "two", "three", "four", "five",
            "six", "seven", "eight", "nine", "ten",
            "eleven", "twelve", "thirteen", "fourteen", "fifteen",
            "sixteen", "seventeen", "eighteen", "nineteen"
         ];

         this.tens = [
            "", "ten", "twenty", "thirty", "forty", "fifty",
            "sixty", "seventy", "eighty", "ninety"
         ];

        this.scales = ["thousand", "million", "billion", "trillion"];

    }

    appendScale(chunk, exp) {

        var scale;

        if(!chunk) {
            return null;
        }

        scale = this.scales[exp - 1];
        return [chunk, scale].join(" ");
    }


    convert(number) {

        return this.splitNumberIntoChunks(number)
                .map(this.convertChunk)
                .map(this.appendScale)
                .reverse()
                .join(' ');

        /*
        var string = chunk(810238903242)
            .map(inEnglish)
            .map(appendScale)
            .filter(isTruthy)
            .reverse()
            .join(" ");*/

    }

    /**
     * Initial entry point for a conversion. Takes a number
     * and processes it based on its grouping.
     *
     * @param number
     * @returns {Array}
     */
    convertChunk(number) {

        let words = [];

        if(number === 0) {
            words = 'zero';
        }
        else if(number === 1000) {
            words = 'one thousand';
        }
        else if(number < 20) {
           words = this.convertNumberLessThan20(number);
        }
        else if(number < 100) {
            words = this.convertNumberLessThan100(number);
        }
        else {
            words = this.convertNumberGreaterThan100(number);
        }

        return words;
    }

    /**
     * Returns the directly mapped number from the oneToNineteen array
     *
     * @param number
     * @returns {*}
     */
    convertNumberLessThan20(number) {
        return this.oneToNineteen[number];
    }

    /**
     * Splits the number by tens and ones, working out
     * the string for each and combining them
     *
     * @param number
     * @returns {string}
     */
    convertNumberLessThan100(number) {

        let words = [];

        let tens = this.getTensFromNumber(number);
        words.push(this.tens[tens]);

        let ones = this.getSingleFromNumber(number);
        words.push(this.convertNumberLessThan20(ones));

        return words.join("");
    }

    /**
     * Works out the number of hundreds, and then does
     * the conversion for the remainder using the same
     * technique as a number less than 100
     *
     * @param number
     * @returns {string}
     */
    convertNumberGreaterThan100(number) {

        let words = [];

        let hundreds = this.getHundredsFromNumber(number);
        words.push(this.convertNumberLessThan20(hundreds));
        words.push("hundred");

        let remainder = number % 100;

        if(remainder > 0) {
            words.push("and");
            words.push(this.convert(remainder));
        }

        return words.join(" ");
    }

    /**
     * Returns the single (0-9) from a larger number by
     * using mod 10, the remainder when diving a number by
     * 10
     *
     * @param number
     * @returns {number}
     */
    getSingleFromNumber(number) {
        return number % 10;
    }

    /**
     * Works out the number of hundreds in a number by
     * dividing by 100 and flooring the result
     *
     * @param number
     * @returns {*|number}
     */
    getHundredsFromNumber(number) {
        return Math.floor(number / 100);
    }

    /**
     * Works out the number of tens in a number by
     * dividing by 100 and flooring the result
     *
     * @param number
     * @returns {*|number}
     */
    getTensFromNumber(number) {
        return Math.floor(number / 10);
    }

    /**
     * Splits a large number into chucks on 0-999
     *
     * @param number
     */
    splitNumberIntoChunks(number) {

        var thousands = [];

        while(number > 0) {

            thousands.push(number % 1000);
            number = Math.floor(number / 1000);
        }

        return thousands;
    }

}

export default new numberToWords();

