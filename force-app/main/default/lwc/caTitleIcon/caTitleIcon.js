import { LightningElement, api, track } from 'lwc';
import myResource from '@salesforce/resourceUrl/clubresources'

export default class CaTitleIcon extends LightningElement {

    @api icon;
    @api iconright;
    @api title;
    @api check;
    @api menuopen

    @track imagePng;
    @track validate;

    connectedCallback() {
        this.imagePng = myResource + '/clubresources/images/' + this.icon + '.png';
        this.check == 'true' ? this.validate = 'mon-title-container mon-title-validate jello-vertical-anim ' : this.validate = 'mon-title-container';
    }

}