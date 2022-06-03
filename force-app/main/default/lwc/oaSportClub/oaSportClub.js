import { LightningElement, api, track, wire } from 'lwc';
import getContacts from '@salesforce/apex/OA_ContactCotroller.getContacts';
import cloneCard from '@salesforce/apex/OA_ContactCotroller.cloneCard';
import { subscribe, unsubscribe, onError, setDebugFlag, isEmpEnabled } from 'lightning/empApi';
import { CurrentPageReference } from 'lightning/navigation';
import { registerListener, unregisterAllListeners } from 'c/pubsub';
import { loadStyle } from 'lightning/platformResourceLoader';
import clubresources from '@salesforce/resourceUrl/clubresources';

export default class OaSportClub extends LightningElement {

    @api recordId = '';
    @api value = 'G001';
    @api columns = '';

    @track groupOptions = [
        { value: 'G001', label: 'Mañana', img: '/resource/1619193218000/clubresources/clubresources/images/G001.svg' },
        { value: 'G002', label: 'Tarde', img: '/resource/1619193218000/clubresources/clubresources/images/G002.svg' },
        { value: 'G003', label: 'Noche', img: '/resource/1619193218000/clubresources/clubresources/images/G003.svg' }
    ];
    @track equipoContactList = [];
    @track classStyle = {};

    get classStyleLine() { return 'slds-col slds-size_' + this.classStyle.numValue + '-of-' + this.classStyle.totalValue + ' slds-m-bottom_medium' };

    @track classStyleString = 'slds-col slds-size_4-of-12 slds-m-bottom_medium';

    @wire(CurrentPageReference) pageRef;

    channelName = '/event/contactPlatformEvent__e';

    connectedCallback() {

        loadStyle(this, clubresources + '/clubresources/css/commonstyles.css');

        localStorage.getItem('colConfig') ? this.classStyleString = localStorage.getItem('colConfig') : null;

        this.getContactsJS(this.value);

        registerListener('classconfig', this.handleStyle, this);

        var self = this;
        // Callback invoked whenever a new event message is received
        const messageCallback = function (response) {
            console.log('New message received: ', JSON.stringify(response));
            // Response contains the payload of the new message received
            self.getContactsJS(this.value);
        };

        // Invoke subscribe method of empApi. Pass reference to messageCallback
        subscribe(this.channelName, -1, messageCallback).then(response => {
            // Response contains the subscription information on subscribe call
            console.log('Subscription request sent to: ', JSON.stringify(response.channel));
            this.subscription = response;
            this.toggleSubscribeButton(true);
        });

    }

    disconnectedCallback() {
        unregisterAllListeners(this);
    }

    handleStyle(payload) {
        this.classStyle = payload;
        this.classStyleString = this.classStyleLine;

    }

    handleChange(evn) {
        this.value = evn.detail.value;
        this.equipoArr = [];

        this.getContactsJS(this.value);
    }

    getContactsJS(value) {
        this.equipoContactList = [];

        getContacts({ equipoId: value })
            .then(res => {
                res.forEach(el => {
                    this.getTeams(el, this.value);
                });
            })
            .catch(error => {
                console.error(error);
            })

    }

    getTeams(contact, value) {

        if (contact.EquipoId__c.includes(value)) {

            this.groupOptions.forEach(g => {
                contact.EquipoId__c = contact.EquipoId__c.replace(g.value, g.img);
                // contact.imgUrl = contact.imgUrl.replace(g.value, g.img);
            })
            contact.EquipoId__c = contact.EquipoId__c.split(";").join(' ');
            //  console.log (contact.imgUrl)
            this.equipoContactList.push({ contact });

        }

        // innerImg(contact.EquipoId__c)


    }

    cloneCardJS(evn) {
        cloneCard({ Id: evn.detail.Id })
            .then(res => {
                this.getContactsJS(this.value);
            })
            .catch(error => {
                console.error(error);
            })
    }


}