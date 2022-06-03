import { LightningElement } from 'lwc';

export default class ValidationObject extends LightningElement {
}

export class InputObject {

    constructor(inputForm) {
        console.log('text type: ', inputForm.type);
        inputForm.addEventListener('focusout', this.focusOutFunc.bind(this));
    }

    focusOutFunc(event) {
        let fieldType = event.currentTarget.type;
        
        this.dataNameReturn(event);
        
        if(fieldType == 'email') {
            this.emailValidationField(event) ? this.validateField(event) : this.rejectField(event);
        } else {
            this.completeField(event) ? this.validateField(event) : this.rejectField(event);
        }
    }

    dataNameReturn(event) {
        return console.log(event.currentTarget.getAttribute("data-name"));
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
            event.currentTarget.classList.add('padleft-validate');
            event.currentTarget.classList.remove('padleft-error');
        } else {
            event.classList.add('padleft-validate');
            event.classList.remove('padleft-error');
        }
    }

    rejectField(event) {
        if(event.currentTarget) {
            event.currentTarget.classList.add('padleft-error');
            event.currentTarget.classList.remove('padleft-validate');
        } else {
            event.classList.add('padleft-error');
            event.classList.remove('padleft-validate');
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
            copyEmail.classList.remove('padleft-error');
            copyEmail.classList.remove('padleft-validate');
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