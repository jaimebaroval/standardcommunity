import { LightningElement, track } from 'lwc';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';
import myResources from '@salesforce/resourceUrl/clubresources';

export default class FooterStylesMon extends LightningElement {

    @track logoImage;
    @track recordBannerHeader;
    @track variablesLoadedPromise;
    @track commonstylesLoadedPromise;
    @track standardvariablesLoadedPromise;
    @track standardstylesLoadedPromise;
    @track heroLoadedPromise;
    @track navbarLoadedPromise;
    @track delayLoadedPromise;
    @track animationLoadedPromise;
    @track headerdetailLoadedPromise;

    
    
    connectedCallback() {

        /* Init Session Storage */
        // localStorage.setItem("variables", false);
        // localStorage.setItem("commonstyles", false);
        // localStorage.setItem("standardvariables", false);
        // localStorage.setItem("standardstyles", false);
        // localStorage.setItem("hero", false);
        // localStorage.setItem("navbar", false);
        // localStorage.setItem("delay", false);
        // localStorage.setItem("animation", false);

        this.variablesLoadedPromise = loadStyle(this, myResources + '/clubresources/css/variables.css');
        this.commonstylesLoadedPromise = loadStyle(this, myResources + '/clubresources/css/commonstyles.css');
        this.standardvariablesLoadedPromise = loadStyle(this, myResources + '/clubresources/css/standardvariables.css');
        this.standardstylesLoadedPromise = loadStyle(this, myResources + '/clubresources/css/standardstyles.css');
        this.heroLoadedPromise = loadStyle(this, myResources + '/clubresources/css/std-hero.css');
        this.navbarLoadedPromise = loadStyle(this, myResources + '/clubresources/css/std-navbar.css');
        this.delayLoadedPromise = loadStyle(this, myResources + '/clubresources/css/std-delay-anim.css');
        this.animationLoadedPromise = loadStyle(this, myResources + '/clubresources/css/std-animation.css');

        // this.variablesLoadedPromise
        // .then(vl => {
        //     localStorage.setItem("variables", vl.returnValue);
        // })      
        
        // this.commonstylesLoadedPromise
        // .then(vl => {
        //     localStorage.setItem("commonstyles", vl.returnValue);
        // }) 
        
        // this.standardvariablesLoadedPromise
        // .then(vl => {
        //     localStorage.setItem("standardvariables", vl.returnValue);
        // })      
        
        // this.standardstylesLoadedPromise
        // .then(vl => {
        //     localStorage.setItem("standardstyles", vl.returnValue);
        // })      
        
        // this.heroLoadedPromise
        // .then(vl => {
        //     localStorage.setItem("hero", vl.returnValue);
        // })      
        
        // this.navbarLoadedPromise
        // .then(vl => {
        //     localStorage.setItem("navbar", vl.returnValue);
        // })      
        
        // this.delayLoadedPromise
        // .then(vl => {
        //     localStorage.setItem("delay", vl.returnValue);
        // })      
        
        // this.animationLoadedPromise
        // .then(vl => {
        //     localStorage.setItem("animation", vl.returnValue);
        // }) 

    }
}