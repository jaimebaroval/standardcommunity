import { LightningElement, track } from 'lwc';

export default class ObjectForm extends LightningElement {

    @track formSubmitButton = [];
    @track formContainer = [];
    @track formContainerObject = [];
    @track formContent = [];
    @track formElements = [];
    @track inputFormGroup = [];
    

    connectedCallback() {

        let formKeys = [];

        setTimeout(() => {
            this.formContainer = this.template.querySelector('.form-container');
            this.formContent = this.template.querySelectorAll('.form-content');
            this.formSubmitButton = this.template.querySelector('.form-submit-button');

            this.formContainerObject = new FormObject(this.formContainer);

            // this.formContent.forEach(fc => {
            //     this.formElements[fc.dataset.name] = new FormSectionObject(fc);
            // });

            console.log('formContainerObject:', this.formContainerObject);

            formKeys = Object.keys(this.formElements);

            // formKeys.forEach(fk => {
            //     console.log('this.formElements:', this.formElements[fk]);
            // })
            console.log('fin SetTimeOut');

        }, 100);
    }
    
    validationForm(event) {
        let formSectionName = event.currentTarget.parentElement.dataset.name;
        let eventFieldName = event.currentTarget.dataset.name;

        let formKeys = [];
        let inputSectionElements = {};
        let inputSectionElementsKeys = [];
        let inputElement;
        let buttonElement;
        let formSectionValidation = false;
        let buttonSectionValidation = {};
        let submitButtonValidation = [];
        let valueButtonKeys = [];
        let valueButton = [];

        formKeys = Object.keys(this.formElements);

            formKeys.forEach(fk => {
                if(fk == formSectionName) {

                    console.log('this.formElements:', this.formElements[fk]);

                    inputSectionElements[fk] = this.formElements[fk].inputElementObject;
                    inputSectionElementsKeys = Object.keys(inputSectionElements[fk]);

                    
                    inputSectionElementsKeys.forEach(isek => {
                        if(isek == eventFieldName) {
                            inputElement = this.formElements[fk].inputElementObject[isek];
                            buttonElement = this.formElements[fk].buttonElementObject[fk];
                            inputElement.completeField(event) ? inputElement.validateField(event) : inputElement.rejectField(event);
                            // inputElement.helpText(event);
                        }
                    })
                    formSectionValidation = this.formElements[fk].inputsValidated();
                    if(formSectionValidation) {
                        buttonElement.validateButton(true);
                        buttonSectionValidation = {[fk]:true};
                    } else {
                        buttonElement.validateButton(false);
                        buttonSectionValidation = {[fk]:false};
                    }
                    submitButtonValidation.push(buttonSectionValidation);
                } else {
                    formSectionValidation = this.formElements[fk].inputsValidated();
                    if(formSectionValidation) {
                        buttonSectionValidation = {[fk]:true};
                    } else {
                        buttonSectionValidation = {[fk]:false};
                    }
                    submitButtonValidation.push(buttonSectionValidation);
                }
                
            })

            submitButtonValidation.forEach(sbv => {
                valueButtonKeys = Object.keys(sbv);
                sbv[valueButtonKeys] ? valueButton.push(true) : valueButton.push(false);
            })

            valueButton.every(vb => vb) ? this.formSubmitButton.disabled = false : this.formSubmitButton.disabled = true;
        }

}


// Form Objects

export class FormObject {

    formName;
    formSectionElements = {};

    constructor(formCont) {
        this.formName = formCont.dataset.name;

        formCont.querySelectorAll('.form-content').forEach(fc => {
            this.formSectionElements[fc.dataset.name] = new FormSectionObject(fc);
        });

    }
}

export class FormSectionObject {

    formSectionName;
    inputElementObject = {};
    buttonElementObject = {};

    constructor(formElement) {
        this.formSectionName = formElement.dataset.name;

        formElement.querySelectorAll('.form-input').forEach(ie => {
            let inputType;

            inputType = ie.dataset.valid;
            if(inputType == 'firstemail') {
                this.inputElementObject[ie.dataset.name] = new EmailInput(ie);
            } else if (inputType == 'phonenumber') {
                this.inputElementObject[ie.dataset.name] = new PhoneInput(ie);
            } else {
                this.inputElementObject[ie.dataset.name] = new InputObject(ie);
            }
        })
        formElement.querySelectorAll('.form-button').forEach(be => {
            this.buttonElementObject = {[be.dataset.name]: new ButtonObject(be)} ;
        })
    }

    inputsValidated() {
        let inputElements = this.inputElementObject;
        let inputElementsKeys = Object.keys(inputElements);
        let formInputsValidation = [];

        inputElementsKeys.forEach(ie => {
            inputElements[ie].inputValidated ? formInputsValidation.push(true) : formInputsValidation.push(false);
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

    helpText(event) {
        event.currentTarget.placeholder = event.currentTarget.dataset.help;
        console.log('helpText:',event.currentTarget.dataset.help);
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

        successIcon.style.display = 'none';
        rejectIcon.style.display = 'flex';
        event.currentTarget.classList.remove("padleft-validate");
        event.currentTarget.classList.add("padleft-error");

        this.inputValidated = false;
    }
}

// Input Child Objects

export class EmailInput extends InputObject {

    constructor(inputForm) {
        super(inputForm);
    }

    completeField(event) {
        this.inputValidated = this.validationInputType(event);

        return this.inputValidated;
    }

    validationInputType(event) {
        const emailValidationFormat = (event) => {
            return event.currentTarget.value.match(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        }

        return emailValidationFormat(event);
    }
}

export class PhoneInput extends InputObject {

    constructor(inputForm) {
        super(inputForm);
    }

    completeField(event) {
        this.inputValidated = this.validationInputType(event);
        return this.inputValidated;
    }

    validationInputType(event) {
        let onlyNum = /^\d+$/.test(event.currentTarget.value);
        let phoneLength = event.currentTarget.value.length === 9;

        return onlyNum && phoneLength;
    }
}

// Button Object

export class ButtonObject { 

    buttonFormObject;
    buttonValidated = false;

    constructor(buttonForm) {
        this.buttonFormObject = buttonForm;
    }

    validateButton(cond) {
        if(cond){
            this.buttonFormObject.disabled = false;
            this.buttonValidated = true;
        } else {
            this.buttonFormObject.disabled = true;
            this.buttonValidated = false;
        }
    }
}