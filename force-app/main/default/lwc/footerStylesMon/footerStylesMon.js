import { LightningElement } from 'lwc';
import { loadStyle } from 'lightning/platformResourceLoader';
import clubresources from '@salesforce/resourceUrl/clubresources';

export default class FooterStylesMon extends LightningElement {

    connectedCallback() {
        loadStyle(this, clubresources + '/clubresources/css/variables.css');
        loadStyle(this, clubresources + '/clubresources/css/commonstyles.css');
        loadStyle(this, clubresources + '/clubresources/css/standardvariables.css');
        loadStyle(this, clubresources + '/clubresources/css/standardstyles.css');
        // loadStyle(this, clubresources + '/clubresources/css/upsa.css');
    }
}