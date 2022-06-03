import { LightningElement } from 'lwc';

export default class InputObject extends LightningElement {}

export class InputObjectLib {

    constructor(inputForm) {
        // console.log('text type: ', inputForm.type)
        // inputForm.addEventListener('focusout', this.focusOutFunc.bind(this));
        console.log('Hello OPP');
    }

    testConsole(saludo) {
        this.saludo = saludo;
        console.log(this.saludo);
    }

    focusOutFunc(event) {
        let dataName = this.dataNameReturn(event);
        let fieldType = event.currentTarget.type

        console.log('dataName: ', dataName)
        
        if(fieldType == 'email') {
            this.emailValidationField(event) ? this.validateField(event) : this.rejectField(event);
        } else {
            this.completeField(event) ? this.validateField(event) : this.rejectField(event);
        }
    }

    dataNameReturn(event) {
        return console.log(event.currentTarget.getAttribute("data-name"));
    }

    // Button Validation

    validationButton (event) {
        let buttonForm = event.currentTarget.parentNode.nextElementSibling;
        let fieldsOnForm = event.currentTarget.parentNode.querySelectorAll('.element');
        let dataName = event.currentTarget.getAttribute('data-name');
        let activeButton = true;

        fieldsOnForm.forEach(fof => {
            if(this.completeField(event)) {
                if(event.currentTarget) {
                    
                }
            }
        })

    }

    completeField(event) {
        if(event.currentTarget.value != '') {
            return true
        } else {
            return false
        };
    }

    validateField(event) {
        if(event.currentTarget) {
            event.currentTarget.classList.add('validate');
            event.currentTarget.classList.remove('reject');
        } else {
            event.classList.add('validate');
            event.classList.remove('reject');
        }
    }

    rejectField(event) {
        if(event.currentTarget) {
            event.currentTarget.classList.add('reject');
            event.currentTarget.classList.remove('validate');
        } else {
            event.classList.add('reject');
            event.classList.remove('validate');
        }
    }

    emailValidationField(event) {
        const email = document.querySelector('.email');
        const copyEmail = document.querySelector('.copy-email');
        let dataName = event.currentTarget.getAttribute('data-name');
        
        if(dataName == 'Email' && copyEmail.value == '') {
            return (this.completeField(event) && emailValidationFormat(event));
        } else if (dataName == 'Email' && copyEmail != '') {
            copyEmail.value = '';
            copyEmail.classList.remove('reject');
            copyEmail.classList.remove('validate');
        }
        
        if(dataName == 'CopyEmail' && (email.value == copyEmail.value) && (email.value != '' && copyEmail.value != '')) {
            this.validateField(copyEmail);
            emailValidationFormat(event) ? this.validateField(email) : this.rejectField(email);
            return (this.completeField(event) && emailValidationFormat(event));
        }

        function emailValidationFormat(event) {
            return event.currentTarget.value.match(
                /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                );
        }
    }
}