import { LightningElement } from 'lwc';

export default class DatosAcademicos extends LightningElement {

    value = '1';

    get options() {
        return [
            { label: 'Estudios Universitarios', value: '1' },
            { label: 'Mayor de 50', value: '2' },
        ];
    }

    handleChange(event) {
        this.value = event.detail.value;
    }
}