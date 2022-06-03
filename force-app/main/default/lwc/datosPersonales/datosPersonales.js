import { LightningElement, api, track } from 'lwc';
import myResource from '@salesforce/resourceUrl/clubresources';


export default class DatosPersonales extends LightningElement {

    value = '1';

    get options() {
        return [
            { label: 'DNI', value: '1' },
            { label: 'NIF', value: '2' },
            { label: 'NIE', value: '3' },
        ];
    }

    @api state;

    @track stateOk;

    @api callChildMethod(param1) {
        this.state = param1;
    }

    renderedCallback() {
        console.log(this.state);
    }

    // @api get state() {
    //     return this.state;
    // }
    // set state(value) {
    //     this.setAttribute('state', value);
    //     this.state = value;
    //     this.handleChange(value);
    // }

    // handleChange(value) {
    //     console.log(value);
    // }
}