import { LightningElement } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import myResource from '@salesforce/resourceUrl/clubresources';

export default class FooterOppForm extends LightningElement {

    connectedCallback() {
        loadStyle(this, myResource + '/clubresources/css/oppform.css');
    }

}