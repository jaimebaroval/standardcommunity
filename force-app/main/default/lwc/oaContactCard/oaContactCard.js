import { LightningElement, api, track } from 'lwc';
import clubresources from '@salesforce/resourceUrl/clubresources';

export default class OaContactCard extends LightningElement {

    @api contact = {};
    // @api team = '';

    @track imgUrl = clubresources + '/clubresources/images/G001.svg';
    @track newContact = {};

    get imgGroup() {return clubresources + '/clubresources/images/G002.svg'};

    cloneCard() {
        this.dispatchEvent(new CustomEvent('clonecard', { detail: { Id: this.contact.contact.Id } }));
    }

    connectedCallback() {
        // console.log('this.team: ', JSON.stringify (this.team));
        console.log(JSON.stringify (this.contact.contact.imgUrl))
            // this.imgUrl = clubresources + '/clubresources/images/' + t + '.svg';
    }

}