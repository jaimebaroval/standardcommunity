import { LightningElement, api, track } from 'lwc';
import myResource from '@salesforce/resourceUrl/clubresources';

export default class MonTitleIcon extends LightningElement {

    @api icon;
    @api title;
    @api check;

    @track imagePng;
    @track validate;

    connectedCallback() {
        this.imagePng = myResource + '/clubresources/images/' + this.icon + '.png';
        this.check == 'true' ? this.validate = 'mon-title-container mon-title-validate' : this.validate = 'mon-title-container';

        console.log(this.validate);
    }

}