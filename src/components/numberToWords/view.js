import numberToWords from './numberToWords';
import numberValidator from '../numberValidator/numberValidator';
import Ractive from '../../../node_modules/ractive/ractive';
import templateString from './template.hbs';

class numberToWordsView {

    constructor() {

        this.errorMsg = 'Please enter a number';

        this.view = new Ractive({

            append: true,
            data: {'error':this.errorMsg},
            el: 'conversion',
            template: templateString
        });

        this.attachEvents();

    }

    attachEvents() {

        this.view.on( 'updateValue', (event) => {

            let number = numberValidator.getValidIntegerFromString(event.node.value);

            if(number !== false) {

                this.view.set('words', numberToWords.convert(number));
                this.view.set('error', '');
            }
            else {

                this.view.set('error', this.errorMsg);
                this.view.set('words', '');
            }

        });

    }

}

export default new numberToWordsView();