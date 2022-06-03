import { LightningElement, track, api, wire } from 'lwc';
import myResource from '@salesforce/resourceUrl/clubresources';
import heroInfoController from '@salesforce/apex/heroInfoController.heroInfoController';

export default class CustomHero extends LightningElement {

    @api volume;
    @api parallax;
    @api objectPage;
    @api contentCaptionCustom;
    @api contentTitleCustom;
    @api contentSubtitleCustom;
    @api heroHeight;
    @api recordId;

    @track backImg;
    @track contentCaptionCustomElem;
    @track contentTitleCustomElem;
    @track contentSubtitleCustomElem;
    @track backgroundImage;
    @track testListViewManager;
    @track accountList = [];
    @track contactItem;



    connectedCallback() {

        // this.backImg = 'background-image: url("' + myResource + '/clubresources/images/incidencias-opt.jpeg' + '")';
        this.backImg = 'background-image: url("' + myResource + '/clubresources/images/' + this.objectPage + '-opt.jpeg")';
        // this.heroInfoControllerJS();

        setTimeout(() => {
            this.contentCaptionCustomElem = this.template.querySelectorAll('.contentCaptionCustom')[0];
            this.contentTitleCustomElem = this.template.querySelectorAll('.contentTitleCustom')[0];
            this.contentSubtitleCustomElem = this.template.querySelectorAll('.contentSubtitleCustom')[0];
            this.backgroundImage = this.template.querySelectorAll('.std-hero-container')[0];
            this.stdHeroOverlay = this.template.querySelectorAll('.std-hero-overlay')[0];
            this.stdHeroContainer = this.template.querySelectorAll('.std-hero-container')[0];
            // this.monFooterContainer = this.template.querySelectorAll('.mon-footer-container')[0];
            // this.testListViewManager = this.template.querySelectorAll('.test-listViewManager')[0];
        }, 100)

        window.addEventListener('scroll', env => {
            //Background Parallax
            this.backgroundImage.style.backgroundPosition = ('0px ' + (window.scrollY * (this.parallax / 10)) + 'px')

            // Movimiento banner parallax
            // **************************
            // this.stdHeroOverlay.style.height = (698 + (window.scrollY * (1.7 / 10)) + 'px')
            // this.stdHeroContainer.style.height = (698 + (window.scrollY * (1.7 / 10)) + 'px')


            // this.monFooterContainer.style.marginTop = (100 + (window.scrollY * (1 / 10)) + 'px')
            // this.testListViewManager.style.marginTop = ((window.scrollY * 0.15) + 'px')

            //Hero Text
            if (window.scrollY >= 105) {
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