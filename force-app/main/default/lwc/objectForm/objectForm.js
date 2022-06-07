import { LightningElement, track } from 'lwc';

export default class ObjectForm extends LightningElement {

    @track formContent = [];
    @track formElements = [];
    @track inputFormGroup = [];

    connectedCallback() {

        let formKeys = [];

        setTimeout(() => {
            this.formContent = this.template.querySelectorAll('.form-content');

            this.formContent.forEach(fc => {
                this.formElements[fc.dataset.name] = new FormObject(fc);
            });

            formKeys = Object.keys(this.formElements);

            formKeys.forEach(fk => {
                console.log('this.formElements:', this.formElements[fk]);
            })

        }, 100);
    }
    
    validationForm(event) {
        let formSectionName = event.currentTarget.parentElement.dataset.name;
        let eventFieldName = event.currentTarget.dataset.name;
        // let validationType = this.inputValidationType[eventFieldName];
        // let inputEventObj = this.dataTableSorter[eventFieldName];

        let formKeys = [];
        let inputSectionElements = {};
        let inputSectionElementsKeys = [];
        let inputElement;
        let formSectionValidation = false;

        formKeys = Object.keys(this.formElements);

            formKeys.forEach(fk => {
                if(fk == formSectionName) {
                    inputSectionElements[fk] = this.formElements[fk].inputElementObject;
                    inputSectionElementsKeys = Object.keys(inputSectionElements[fk]);

                    
                    inputSectionElementsKeys.forEach(isek => {
                        if(isek == eventFieldName) {
                            inputElement = this.formElements[fk].inputElementObject[isek];
                            inputElement.completeField(event);
                            console.log('inputElement:',inputElement)
                        }
                    })
                    // formSectionValidation = this.formElements[fk].inputElementObject.inputsValidated(event);
                    formSectionValidation = this.formElements[fk].inputsValidated(event);

                    console.log('inputSectionElements[fk]:',inputSectionElements);
                    console.log('formSectionValidation:',formSectionValidation);
                    console.log('eventFieldName:',eventFieldName);
                    
                }
            })
    }

}


// Form Object

export class FormObject {

    formDataName;
    inputElementObject = {};

    constructor(formElement) {
        this.formDataName = formElement.dataset.name;

        formElement.querySelectorAll('.form-input').forEach(ie => {
            this.inputElementObject[ie.dataset.name] = new InputObject(ie);
        })
    }

    inputsValidated(event) {
        let inputElements = this.inputElementObject;
        let inputElementsKeys = Object.keys(inputElements);
        let formInputsValidation = [];

        
        inputElementsKeys.forEach(ie => {
            inputElements[ie].inputValidated ? formInputsValidation.push(true) : formInputsValidation.push(false);
            // console.log('inputElementObject.inputValidated:', this.inputElementObject[ie].inputValidated);
        })

        return formInputsValidation.every(fiv => fiv);
    }
}

// Input Object

export class InputObject {

    inputFormObject;
    inputFormType;
    inputFormValidation;
    inputValidated = false;

    constructor(inputForm) {

        this.inputFormObject = inputForm;
        this.inputFormType = inputForm.type;
        this.inputFormValidation = inputForm.dataset.valid;
    }

    testComent(event) {
        console.log('name:',event.currentTarget.dataset.name);
    }

    completeField(event) {
        let fieldValue = event.currentTarget.value;

        fieldValue ? this.inputValidated = true : this.inputValidated = false;

        return this.inputValidated;
    }

    validateField(event) {
        let validationIcon = event.currentTarget.nextElementSibling;
        let successIcon = validationIcon.children[0];
        let rejectIcon = validationIcon.children[1];

        successIcon.style.display = 'flex';
        rejectIcon.style.display = 'none';
        event.currentTarget.classList.add("padleft-validate");
        event.currentTarget.classList.remove("padleft-error");

        this.inputValidated = true;
    }

    rejectField(event) {
        let validationIcon = event.currentTarget.nextElementSibling;
        let successIcon = validationIcon.children[0];
        let rejectIcon = validationIcon.children[1];

        console.log('reject');
        successIcon.style.display = 'none';
        rejectIcon.style.display = 'flex';
        event.currentTarget.classList.remove("padleft-validate");
        event.currentTarget.classList.add("padleft-error");

        this.inputValidated = false;
    }
}