import { LightningElement, track } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import clubresources from '@salesforce/resourceUrl/clubresources';

export default class FooterStylesMon extends LightningElement {

    @track logoImage;
    
    connectedCallback() {
        loadStyle(this, clubresources + '/clubresources/css/variables.css');
        loadStyle(this, clubresources + '/clubresources/css/commonstyles.css');
        loadStyle(this, clubresources + '/clubresources/css/standardvariables.css');
        loadStyle(this, clubresources + '/clubresources/css/standardstyles.css');
        // loadStyle(this, clubresources + '/clubresources/css/upsa.css');
        
    }
    
    // renderedCallback() {
    //     loadScript(this, clubresources + '/clubresources/js/globalscript.js');
    // }

}