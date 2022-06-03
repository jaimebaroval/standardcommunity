import { LightningElement, track } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import clubresources from '@salesforce/resourceUrl/clubresources';
import myResource from '@salesforce/resourceUrl/clubresources';

export default class FooterStyles extends LightningElement {

    @track imagePng;
    @track stylesLoaded;

    connectedCallback() {
        loadStyle(this, clubresources + '/clubresources/css/variables.css');
        // loadStyle(this, clubresources + '/clubresources/css/commonstyles.css');
        loadStyle(this, clubresources + '/clubresources/css/standardvariables.css');
        // loadStyle(this, clubresources + '/clubresources/css/standardstyles.css');
        loadStyle(this, clubresources + '/clubresources/css/upsa.css');
    }

    // connectedCallback() {

    //     loadStyle(this, clubresources + '/clubresources/css/variables.css');
    //     loadStyle(this, clubresources + '/clubresources/css/commonstyles.css');
    //     // loadStyle(this, clubresources + '/clubresources/css/standardvariables.css');
    //     // loadStyle(this, clubresources + '/clubresources/css/standardstyles.css');
    //     loadStyle(this, clubresources + '/clubresources/css/mondragon.css');
    //     this.imagePng = myResource + '/clubresources/images/logoweb-white.png';

    //     setTimeout(() => {

    //         // backgroundImage = this.template.querySelectorAll('.logoImage');
    //         // console.log(JSON.stringify(this.template.querySelectorAll('.mon-footer-container')[0].outerHTML));

    //     }, 2000)

    // }
}