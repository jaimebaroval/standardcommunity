import { LightningElement, track, wire, api } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import { fireEvent } from 'c/pubsub';

export default class OaColConfig extends LightningElement {

    @api columns = 0;

    @track colConf = { numValue: '4', totalValue: '12' };

    @wire(CurrentPageReference) pageRef;

    get classStyleLine() { return 'slds-col slds-size_' + this.colConf.numValue + '-of-' + this.colConf.totalValue + ' slds-m-bottom_medium' };

    connectedCallback() {
        localStorage.getItem('numValue') ? this.colConf.numValue = localStorage.getItem('numValue') : null;
        localStorage.getItem('totalValue') ? this.colConf.totalValue = localStorage.getItem('totalValue') : null;
    }

    handleChangeNumColumn(env) {
        this.colConf.numValue = env.currentTarget.value;
        this.setColumnConfig(this.colConf);
    }

    handleChangeTotalColumn(env) {
        this.colConf.numValue > this.colConf.totalValue ? this.colConf.numValue = this.colConf.totalValue : null;
        this.colConf.totalValue = env.currentTarget.value;
        this.setColumnConfig(this.colConf);
    }

    setColumnConfig(classStyle) {
        localStorage.setItem('colConfig', this.classStyleLine);
        localStorage.setItem('numValue', classStyle.numValue.toString());
        localStorage.setItem('totalValue', classStyle.totalValue.toString());
        fireEvent(this.pageRef, 'classconfig', classStyle);

    }

}