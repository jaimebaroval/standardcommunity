import { LightningElement, api, track } from 'lwc';
import myResource from '@salesforce/resourceUrl/clubresources';

export default class MasterTitle extends LightningElement {

    @api icon;
    @api title;

    @track imagePng;

    connectedCallback() {
        this.imagePng = myResource + '/clubresources/images/' + this.icon + '.png';
    }

}