import { LightningElement, track, api, wire } from 'lwc';
import myResource from '@salesforce/resourceUrl/clubresources';
import heroInfoController from '@salesforce/apex/heroInfoController.heroInfoController';
import { loadStyle, loadScript } from 'lightning/platformResourceLoader';

export default class CustomHero extends LightningElement {

    @api volume;
    @api parallax;
    @api objectPage;
    @api contentCaptionCustom;
    @api contentTitleCustom;
    @api contentSubtitleCustom;
    @api heroHeight;
    @api recordId;
    @api overlayColor;
    @api filterHue;

    @track backImg;
    @track backImgAnim;
    @track backProdAnim;
    @track contentCaptionCustomElem;
    @track contentTitleCustomElem;
    @track contentSubtitleCustomElem;
    @track backgroundImage;
    @track testListViewManager;
    @track accountList = [];
    @track contactItem;
    @track contactDetailHeader;
    @track isHomePage = false;
    @track isProductPage = false;
    @track isDefaultPage = false;
    @track isDetailPage = false;
    @track isProductDetailPage = false;
    @track isEventDetailPage = false;
    @track overlayColorStyle;
    @track filterHueStyle;
    @track backgroundImageProdAnim;
    @track backgroundImageHomeAnim;
    @track headerdetailLoadedPromise;
    @track headerdetailresetLoadedPromise;


    connectedCallback() {

        let showHeaderData = false;

        if(this.volume == 1) { this.isDefaultPage = true };
        if(this.volume == 2) { this.isHomePage = true };
        if(this.volume == 3) { this.isProductPage = true };
        if(this.volume == 4) { this.isDetailPage = true };
        if(this.volume == 5) { this.isProductDetailPage = true };
        if(this.volume == 6) { this.isEventDetailPage = true };

        // this.backImg = 'background-image: url("' + myResource + '/clubresources/images/incidencias-opt.jpeg' + '")';
        
        this.backImg = 'background-image: url("' + myResource + '/clubresources/images/' + this.objectPage + '-opt.jpeg")';
        this.backImgAnim = 'background-image: url("' + myResource + '/clubresources/images/' + 'backimg-anim-opt.png")';
        this.backProdAnim = 'background-image: url("' + myResource + '/clubresources/images/' + 'backimg-product-opt.png"); filter: hue-rotate(293deg) brightness(0.5);';
        this.filterHue ? this.backImg = 'background-image: url("' + myResource + '/clubresources/images/' + this.objectPage + '-opt.jpeg");' + 'filter: ' + this.filterHue + ';'
         : this.backImg = 'background-image: url("' + myResource + '/clubresources/images/' + this.objectPage + '-opt.jpeg");'
        this.overlayColorStyle = 'background: linear-gradient(180deg, rgb(0 0 0 / 30%) 0%,' + this.overlayColor + ') !important;';
        // this.heroInfoControllerJS();

        setTimeout(() => {
            this.contentCaptionCustomElem = this.template.querySelectorAll('.contentCaptionCustom')[0];
            this.contentTitleCustomElem = this.template.querySelectorAll('.contentTitleCustom')[0];
            this.contentSubtitleCustomElem = this.template.querySelectorAll('.contentSubtitleCustom')[0];
            this.backgroundImage = this.template.querySelectorAll('.std-hero-container')[0];
            this.backgroundImageProdAnim = this.template.querySelectorAll('.std-hero-container-prod-anim')[0];
            this.backgroundImageHomeAnim = this.template.querySelectorAll('.std-hero-container-anim')[0];
            this.stdHeroOverlay = this.template.querySelectorAll('.std-hero-overlay')[0];
            this.stdHeroContainer = this.template.querySelectorAll('.std-hero-container')[0];
        }, 0.001)

        
        window.addEventListener('scroll', env => {
            
            //Background Parallax
            this.backgroundImage ? this.backgroundImage.style.backgroundPosition = ('0px ' + (window.scrollY * (this.parallax / 10)) + 'px'): null;
            this.backgroundImageProdAnim ? this.backgroundImageProdAnim.style.backgroundPosition = ('0px ' + (window.scrollY * (1 / 10)) + 'px') : null;
            // this.isDetailPage ? this.backgroundImageProdAnim.style.backgroundPosition = ('0px ' + (window.scrollY * (1 / 10) + 130) + 'px') : null;
            this.backgroundImageHomeAnim ? this.backgroundImageHomeAnim.style.backgroundPosition = ('0px ' + (window.scrollY * (1 / 10)) + 'px') : null;

            // Movimiento banner parallax
            // **************************
            // this.stdHeroOverlay.style.height = (698 + (window.scrollY * (1.7 / 10)) + 'px')
            // this.stdHeroContainer.style.height = (698 + (window.scrollY * (1.7 / 10)) + 'px')


            // this.monFooterContainer.style.marginTop = (100 + (window.scrollY * (1 / 10)) + 'px')
            // this.testListViewManager.style.marginTop = ((window.scrollY * 0.15) + 'px')

            //Hero Text
            if (window.scrollY > 105) {
                this.contentCaptionCustomElem.classList.remove('delay08');
                this.contentCaptionCustomElem.classList.replace('slide-in-bottom-anim', 'slide-out-bottom-anim');
                this.contentTitleCustomElem.classList.replace('delay07', 'delay01');
                this.contentTitleCustomElem.classList.replace('slide-in-bottom-anim', 'slide-out-bottom-anim');
                this.contentSubtitleCustomElem.classList.replace('delay06', 'delay02');
                this.contentSubtitleCustomElem.classList.replace('slide-in-bottom-anim', 'slide-out-bottom-anim');
            } else {
                this.contentCaptionCustomElem.classList.replace('slide-out-bottom-anim', 'slide-in-bottom-anim');
                this.contentTitleCustomElem.classList.replace('slide-out-bottom-anim', 'slide-in-bottom-anim');
                this.contentSubtitleCustomElem.classList.replace('slide-out-bottom-anim', 'slide-in-bottom-anim');
            }

            if (window.scrollY >= 330 && (this.isProductDetailPage || this.isDetailPage) && !showHeaderData) {
                showHeaderData = true;
                this.headerdetailLoadedPromise = loadStyle(this, myResource + '/clubresources/css/headerdetail.css');
                // if(!sessionStorage.getItem("headerdetail")) {loadStyle(this, myResource + '/clubresources/css/headerdetail.css')};
                // sessionStorage.setItem("headerdetailreset", false);

            } else if (window.scrollY <= 330 && (this.isProductDetailPage || this.isDetailPage) && showHeaderData) {
                showHeaderData = false;
                this.headerdetailOk = 0;
                this.headerdetailresetLoadedPromise = loadStyle(this, myResource + '/clubresources/css/headerdetailreset.css');
                // if(!sessionStorage.getItem("headerdetailreset")) {loadStyle(this, myResource + '/clubresources/css/headerdetailreset.css')};
                // sessionStorage.setItem("headerdetail", false);
            }

        });

    }

    // heroInfoControllerJS() {
    //     heroInfoController()
    //         .then(res => {
    //             this.contactItem = res.AccountId;
    //             console.log(res.Id)
    //         })
    //         .catch(err => console.log(err));
    // }

    renderedCallback() {

    }
}