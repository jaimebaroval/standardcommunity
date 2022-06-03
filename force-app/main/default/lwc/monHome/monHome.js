import { LightningElement } from 'lwc';

export default class MonHome extends LightningElement {

    value = '1';

    get options() {
        return [
            { label: 'Master en ciencias gastronómicas', value: '1' },
            { label: 'Master en ciencias 2', value: '2' },
            { label: 'Master en ciencias 3', value: '3' },
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
    }
}