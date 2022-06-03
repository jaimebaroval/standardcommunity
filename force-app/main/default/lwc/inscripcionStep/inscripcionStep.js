import { LightningElement, api, track } from 'lwc';

export default class InscripcionStep extends LightningElement {

@api num;
@api title;
@api state;

@track bkColor;

connectedCallback() {
    this.state == 'inactive' ? this.bkColor = 'background-color: var(--mon-light-grey-color)' : this.state == 'active' ? this.bkColor = 'background-color: var(--mon-secondary-color)' : this.bkColor = 'background-color: var(--mon-primary-color)';
}

}