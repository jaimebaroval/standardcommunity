import { LightningElement, api, track } from 'lwc';
import myResource from '@salesforce/resourceUrl/clubresources';

export default class MonStepIcons extends LightningElement {

    @api state;
    @api icon;
    @api title;
    @api num;
    @api text;

    @track container
    @track imagePng;
    @track numStyle;
    @track iconImg;
    @track iconLine;


    connectedCallback() {
        this.imagePng = myResource + '/clubresources/images/' + this.icon + '.png';
        if (this.state == 'light-grey') {
            this.container = 'mon-step-icon-container-light-grey'
        } else {
            this.container = 'mon-step-icon-container'

        }
        this.numStyle = 'mon-step-icon-number ' + this.state;
        this.iconImg = 'mon-step-icon-img ' + this.state;
        this.iconLine = 'mon-step-icon-line ' + this.state;
    }
}