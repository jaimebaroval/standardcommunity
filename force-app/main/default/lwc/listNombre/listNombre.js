import { LightningElement, track, wire,api } from 'lwc';
import listNombre from '@salesforce/apex/listNombre.listNombre';
import { getRecord, getFieldValue } from "lightning/uiRecordApi";
import CONTACT_ID from "@salesforce/schema/User.ContactId";
import USER_ID from '@salesforce/user/Id';

export default class ListNombre extends LightningElement {

    
    @track nombresList = [];
    @track userId = '';
    @track rendered = false;
    
    @wire(getRecord, { recordId: USER_ID, fields: [CONTACT_ID] })
    user;

    get contactId() {
        return getFieldValue(this.user.data, CONTACT_ID);
    }
    
    connectedCallback() {
        this.userId = USER_ID;
        console.log('this.userId: ', this.userId);
    }
    
    renderedCallback() {
        if (this.rendered != true && this.contactId) {
            this.listNombreJS(this.contactId);
            this.rendered = true;
        }
        console.log('this.contactId: ', this.contactId)
        // !this.contactId && this.listNombreJS(this.contactId);
        
    }

    listNombreJS(userIdValue) {
        console.log('userIdValue: ', userIdValue);
        listNombre({userId: userIdValue})
            .then(res => {
                this.nombresList = res;
                console.log('res: ', res)
            })
            .catch(err => console.log(err));
    }
}