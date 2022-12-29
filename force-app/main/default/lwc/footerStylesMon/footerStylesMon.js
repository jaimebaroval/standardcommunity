import { LightningElement, track } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import myResources from '@salesforce/resourceUrl/clubresources';

export default class FooterStylesMon extends LightningElement {

    @track logoImage;
    @track recordBannerHeader;
    
    connectedCallback() {
        loadStyle(this, myResources + '/clubresources/css/variables.css');
        loadStyle(this, myResources + '/clubresources/css/commonstyles.css');
        loadStyle(this, myResources + '/clubresources/css/standardvariables.css');
        loadStyle(this, myResources + '/clubresources/css/standardstyles.css');
        loadStyle(this, myResources + '/clubresources/css/std-hero.css');
        // loadStyle(this, clubresources + '/clubresources/css/upsa.css');
        
    }
    
    // renderedCallback() {
    //     loadScript(this, clubresources + '/clubresources/js/globalscript.js');
    // }

}