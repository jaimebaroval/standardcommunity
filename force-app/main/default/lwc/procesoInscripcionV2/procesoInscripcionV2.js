import { LightningElement, api, track } from 'lwc';

export default class ProcesoInscripcionV2 extends LightningElement {

    @api myState;
    @track returnValue = [];

    HandleNextForm() {
        console.log(this.myState);
        this.template.querySelector('c-datos-personales').callChildMethod('My param');
    }

}