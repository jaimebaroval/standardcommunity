import { LightningElement, track } from 'lwc';

export default class OppForm extends LightningElement {
    
    @track dataTableSorter = [];
    @track formContent = [];
    @track inputElement = [];
    @track inputValidationType = 
        {
            numerodocumento: 'text',
            email: 'firstEmail',
            telefono: 'phoneNumber',
            movil: 'phoneNumber',
        };

    connectedCallback() {

        setTimeout(() => {
            this.formContent = this.template.querySelectorAll('.form-content');
            this.formContent.forEach(fc => {
                this.inputElement = fc.querySelectorAll('.form-input');
                this.inputElement.forEach(ie => {
                    this.dataTableSorter[ie.dataset.name] = new InputObject(ie);
                })
            });
        }, 100);
    }

    validationFunc(event) {
        let eventFieldName = event.currentTarget.dataset.name;
        let validationType = this.inputValidationType[eventFieldName];
        let inputEventObj = this.dataTableSorter[eventFieldName];

        if(inputEventObj.completeField(event)){
            if(validationType == 'text'){
                inputEventObj.validateField(event)
            } 
            if(validationType == 'firstEmail') {
                inputEventObj.emailValidationField(event) ? inputEventObj.validateField(event) : inputEventObj.rejectField(event);
            }
            if(validationType == 'phoneNumber') {
                inputEventObj.phoneValidationField(event) ? inputEventObj.validateField(event) : inputEventObj.rejectField(event);
            }
        } else {
            inputEventObj.rejectField(event);
        }
    }
    
}


// Objeto
// Insertar el código HTML de los iconos de validación en el Objeto para que el código del HTML sea más limpio

export class InputObject {

    inputFormObject;
    inputFormType;

    constructor(inputForm) {
        
        this.inputFormObject = inputForm;
        console.log('inputFormObject:', this.inputFormObject);
    }

    completeField(event) {
        let fieldValue = event.currentTarget.value;

        return fieldValue !== '';
    }

    validateField(event) {
        let validationIcon = event.currentTarget.nextElementSibling;
        let successIcon = validationIcon.children[0];
        let rejectIcon = validationIcon.children[1];

        successIcon.style.display = 'flex';
        rejectIcon.style.display = 'none';
        event.currentTarget.classList.add("padleft-validate");
        event.currentTarget.classList.remove("padleft-error");
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
    }

    phoneValidationField(event) {
        let onlyNum = /^\d+$/.test(event.currentTarget.value);
        let phoneLength = event.currentTarget.value.length === 9;

        return onlyNum && phoneLength;
    }

    emailValidationField(event) {
        console.log('emailValidationField:', event.currentTarget.type);

        const emailValidationFormat = (event) => {
            return event.currentTarget.value.match(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        }

        return emailValidationFormat(event);
    }
    
    

    // Button Validation

    // validationButton (event) {
    //     let buttonForm = event.currentTarget.parentNode.nextElementSibling;
    //     let fieldsOnForm = event.currentTarget.parentNode.querySelectorAll('.element');
    //     let dataName = event.currentTarget.getAttribute('data-name');
    //     let activeButton = true;

    //     fieldsOnForm.forEach(fof => {
    //         if(this.completeField(event)) {
    //             if(event.currentTarget) {
                    
    //             }
    //         }
    //     })

    // }

    // completeField(event) {
    //     if(event.currentTarget.value != '') {
    //         return true
    //     } else {
    //         return false
    //     };
    // }

    

    // rejectField(event) {
    //     if(event.currentTarget) {
    //         event.currentTarget.classList.add('reject');
    //         event.currentTarget.classList.remove('validate');
    //     } else {
    //         event.classList.add('reject');
    //         event.classList.remove('validate');
    //     }
    // }

    
}