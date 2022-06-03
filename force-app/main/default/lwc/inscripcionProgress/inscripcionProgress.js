import { LightningElement } from 'lwc';

export default class InscripcionProgress extends LightningElement {

    steps = [
        { label: 'Información', value: 'step-1' },
        { label: 'Documentación', value: 'step-2' },
        { label: 'Validado', value: 'step-3' },
    ];
}