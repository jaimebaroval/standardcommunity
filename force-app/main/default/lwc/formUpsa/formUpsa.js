import { LightningElement, track } from 'lwc';
import myResource from '@salesforce/resourceUrl/clubresources';

export default class FormUpsa extends LightningElement {

    /* Common Var */
    @track fieldStatus = {};
    @track objIndex;
    @track buttonActivation = null;
    @track buttonActivationAcademicos = null;
    @track buttonActivationAcceso = null;

    /* Step 1 - Datos Personales */

    valueIdentificacion = null;
    valueTipoEstudio = null;
    valueTitulaciones = null;

    get identificacion() {
        return [
            { label: 'NIF', value: '1' },
            { label: 'NIE', value: '2' },
        ];
    }

    get tipoEstudios() {
        return [
            { label: 'Grados', value: '1' },
            { label: 'Dobles Grados', value: '2' },
        ];
    }

    get titulaciones() {
        return [
            { label: 'Grado en Periodismo', value: '1' },
            { label: 'Doble Grado en Comunicación', value: '2' },
        ];
    }

    @track datosPersonalesFields = [];
    @track formDatos = [];
    @track formDatosHeight;
    @track formDatosFields = [];
    @track step1Button;

    /* Step 2 - Datos de Contacto */

    valueTipoFp = null;
    @track academicosFields = [];
    @track formPaso2 = [];
    @track formPaso2Height;
    @track formContactoFields = [];
    @track step2Button;

    /* Step 3 - Datos de Acceso */

    valueTitulo = null;
    valueTipoEvau = null;

    @track accesoFields = [];
    @track formPaso3 = [];
    @track formPaso3Height;
    @track accesoEvauFields = [];
    @track accesoFpFields = [];
    @track step3Button;
    @track stepSaveButton;


    /* Step 3 EvAU */
    @track formEvau;
    @track evauFields = [];
    @track buttonActivationEvauAcceso;
    @track formEvauSelectedAcceso;

    /* Step 3 Fp */
    @track formFp;
    @track fpFields = [];
    @track buttonActivationFpAcceso;
    @track formFpSelectedAcceso;

    /* Step 3 No Finalizados */
    @track formNoFinalizados;
    @track noFinalizadosFields = [];
    @track buttonActivationNoFinalizadosAcceso;
    @track formNoFinalizadosSelectedAcceso;

    /* Step 3 Mayores 25 */
    @track formMayores25;
    @track mayores25Fields = [];
    @track buttonActivationMayores25Acceso;
    @track formMayores25SelectedAcceso;

    /* Step 3 Extrajeros */
    @track formExtranjeros;
    @track extranjerosFields = [];
    @track buttonActivationExtranjerosAcceso;
    @track formExtranjerosSelectedAcceso;

    /* Validation Form */
    @track buttonValidation;
    @track navbarStep1Timeline;



    get formaacceso() {
        return [
            { label: 'Bachillerato + EvAU', value: '1' },
            { label: 'Ciclo Formativo FP', value: '2' },
            { label: 'Titulación Universitaria no Finalizada', value: '3' },
            { label: 'Mayores de 25', value: '4' },
            { label: 'Estudios extranjeros Título Universitario', value: '5' },
            { label: 'Título Universitario', value: '6' },
        ];
    }

    get tipoevau() {
        return [
            { label: 'tipo 1', value: '1' },
            { label: 'tipo 2', value: '2' },
            { label: 'tipo 3', value: '3' },
            { label: 'tipo 4', value: '4' },
            { label: 'tipo 5', value: '5' },
            { label: 'tipo 6', value: '6' },
        ];
    }

    get tipofp() {
        return [
            { label: 'tipo FP 1', value: '1' },
            { label: 'tipo FP 2', value: '2' },
            { label: 'tipo FP 3', value: '3' },
            { label: 'tipo FP 4', value: '4' },
            { label: 'tipo FP 5', value: '5' },
            { label: 'tipo FP 6', value: '6' },
        ];
    }

    connectedCallback() {

        setTimeout(() => {
            /* Paso 1 */
            this.formDatos = this.template.querySelectorAll('.datos-container');
            this.formDatosHeight = this.formDatos[0].clientHeight;
            /* Paso 1 Form Fields */
            this.formDatosFields = this.template.querySelectorAll('.datos-container .upsa-input');
            /* Create Array Empty Paso 1 Fields */
            this.formDatosFields.forEach(fF => {
                this.fieldStatus = {};
                this.fieldStatus.label = fF.dataset.name;
                this.fieldStatus.value = false;
                this.datosPersonalesFields.push(this.fieldStatus);
            });

            /* Paso 2 */
            this.formPaso2 = this.template.querySelectorAll('.paso2-container');
            this.formPaso2Height = this.formPaso2[0].clientHeight;
            this.formPaso2[0].style.display = "none";
            /* Paso 2 Form Fields */
            this.formContactoFields = this.template.querySelectorAll('.paso2-container .upsa-input');
            /* Create Array Empty Paso 2 Fields */
            this.formContactoFields.forEach(fF => {
                this.fieldStatus = {};
                this.fieldStatus.label = fF.dataset.name;
                this.fieldStatus.value = false;
                this.academicosFields.push(this.fieldStatus);
            });

            /* Paso 3 */
            this.formPaso3 = this.template.querySelectorAll('.acceso-container');
            this.formPaso3Height = this.formPaso3[0].clientHeight;
            this.formPaso3[0].style.display = "none";
            /* Paso 3 Form Fields */
            /* Create Array Empty Paso 3 Fields */


            /* Paso 3 EvAU */
            this.accesoEvauFields = this.template.querySelectorAll('.upsa-input-evau');
            this.formEvau = this.template.querySelector('.tipoevau-container');
            this.accesoEvauFields.forEach(fF => {
                this.fieldStatus = {};
                this.fieldStatus.label = fF.dataset.name;
                this.fieldStatus.value = false;
                this.evauFields.push(this.fieldStatus);
            });

            /* Paso 3 FP */
            this.accesoFpFields = this.template.querySelectorAll('.upsa-input-fp');
            this.formFp = this.template.querySelector('.tipofp-container');
            this.accesoFpFields.forEach(fF => {
                this.fieldStatus = {};
                this.fieldStatus.label = fF.dataset.name;
                this.fieldStatus.value = false;
                this.fpFields.push(this.fieldStatus);
            });

            /* Paso 3 No Finalizados */
            this.formNoFinalizados = this.template.querySelector('.tiponofinalizado-container');
            this.accesoNoFinalizadosFields = this.template.querySelectorAll('.upsa-input-nofinalizado');
            this.accesoNoFinalizadosFields.forEach(fF => {
                this.fieldStatus = {};
                this.fieldStatus.label = fF.dataset.name;
                this.fieldStatus.value = false;
                this.noFinalizadosFields.push(this.fieldStatus);
            });

            /* Paso 3 Mayores 25 */
            this.formMayores25 = this.template.querySelector('.tipomayores25-container');
            this.accesoMayores25Fields = this.template.querySelectorAll('.upsa-input-mayores25');
            this.accesoMayores25Fields.forEach(fF => {
                this.fieldStatus = {};
                this.fieldStatus.label = fF.dataset.name;
                this.fieldStatus.value = false;
                this.mayores25Fields.push(this.fieldStatus);
            });

            /* Paso 3 Extranjeros */
            this.formExtranjeros = this.template.querySelector('.tipoextranjeros-container');
            this.accesoExtranjerosFields = this.template.querySelectorAll('.upsa-input-extranjeros');
            this.accesoExtranjerosFields.forEach(fF => {
                this.fieldStatus = {};
                this.fieldStatus.label = fF.dataset.name;
                this.fieldStatus.value = false;
                this.extranjerosFields.push(this.fieldStatus);
            });

            console.log(this.accesoEvauFields)
            console.log(this.accesoFpFields)
            console.log(this.accesoNoFinalizadosFields)
            console.log(this.accesoMayores25Fields)
            console.log(this.accesoExtranjerosFields)

            /* Button */
            this.step1Button = this.template.querySelector('.upsa-button-paso1');
            this.step2Button = this.template.querySelector('.upsa-button-paso2');
            this.step3Button = this.template.querySelector('.upsa-button-paso3');
            this.stepSaveButton = this.template.querySelector('.upsa-button-paso-save');

            /* Navbar Timeline */
            this.navbarStep2Timeline = this.template.querySelector('.step2-timeline');
            this.navbarStep1Progress = this.template.querySelector('.step-progress-01');

        }, 100)

    }



    /* 
    ******************************************
    NUEVA VALIDACIÓN
    ******************************************
    */

    handleClickSelect(event) {
        event.currentTarget.classList.toggle('conocenos-card-disabled');
    }

    handleChangeInput(event) {
        
        this.validationFieldsIcons(event);
        this.validationButton(event);
        this.progressAnimBar();

    }

    validationFieldsIcons(event) {
        let validationContainer = event.currentTarget.nextElementSibling;
        let emailValidationInput = true;

        if (event.currentTarget.type == 'email') {
            emailValidationInput = this.emailValidation(event)
        }
        
        if (event.currentTarget.value != '' && emailValidationInput) {
            validationContainer.children[0].style.display = "flex";
            validationContainer.children[1].style.display = "none";
            event.currentTarget.classList.add("padleft-validate");
            event.currentTarget.classList.remove("padleft-error");
        } else {
            validationContainer.children[0].style.display = "none";
            validationContainer.children[1].style.display = "flex";
            event.currentTarget.classList.remove("padleft-validate");
            event.currentTarget.classList.add("padleft-error");
            if(event.currentTarget.type == 'date') {
                event.currentTarget.placeholder = 'Rellena el campo / Formato correcto'
            } else {
                event.currentTarget.placeholder = 'Rellena el campo';
            }
        }
        if (event.currentTarget.value === null) {
            validationContainer.children[0].style.display = "none";
            validationContainer.children[1].style.display = "flex";
            event.currentTarget.classList.add("padleft-error");
            event.currentTarget.value = '';
        }
    }
    
    validationButton(event) {
        this.buttonValidation = 0;
        let parentElementForm = event.currentTarget;
        let emailValidationInput = true;
        let validationFields = [];

        if (event.currentTarget.type == 'email') {
            emailValidationInput = this.emailValidation(event)
        }

        while(parentElementForm) {
            parentElementForm = parentElementForm.parentNode;
            if (parentElementForm.classList.contains('form-container-event')) {
                break;
            }
        }

        if(parentElementForm) {this.formDatosFields = parentElementForm.querySelectorAll('.upsa-input');}

        console.log('this.formDatosFields: ', this.formDatosFields);

        this.formDatosFields.forEach(fdf => {
            console.log('fdf.value: ', fdf.value);
            if (fdf.value == '' || fdf.value == null) {
                this.buttonValidation++;
                fdf.validation = false;
            } else {
                this.buttonValidation--;
                fdf.validation = true;
            }
            validationFields.push(fdf.validation);

        });

        this.buttonValidation = validationFields.filter(Boolean).length;
        

        // Disable or Active Buttons

        if(this.buttonValidation == this.formDatosFields.length && emailValidationInput) {
            if (parentElementForm.classList.contains('datos-container')) {
                this.step2Button.disabled = false;
                // this.navbarStep2Timeline.classList.remove('step-disabled');
            } else if (parentElementForm.classList.contains('paso2-container')) {
                this.step3Button.disabled = false;
            }
        } else {
            if (parentElementForm.classList.contains('datos-container')) {
                this.step2Button.disabled = true;
                // this.navbarStep2Timeline.classList.add('step-disabled');
            } else if (parentElementForm.classList.contains('paso2-container')) {
                this.step3Button.disabled = true;
            }
        }
    }

    emailValidation(event) {

        return event.currentTarget.value.match(
            /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          );
    }

    progressAnimBar() {
        let barSections = 100 / this.formDatosFields.length;

        console.log('barSections: ', barSections);

        this.navbarStep1Progress.style.width = barSections * this.buttonValidation + "%";
    }













    /* 
    ********************************************
    ANTERIOR LÓGICA DE VALIDACIÓN DE FORMULARIO
    ********************************************
    */


    
    /* List Events Datos Personales */
    
    handleChangeIdentificacion(event) {
        this.valueIdentificacion = event.detail.value;
        this.onChangeButtomActive(event);
    }

    handleChangeTipoEstudio(event) {
        this.valueTipoEstudio = event.detail.value;
        this.onChangeButtomActive(event);
    }

    handleChangeTitulaciones(event) {
        this.valueTitulaciones = event.detail.value;
        this.onChangeButtomActive(event);
    }

    /* List Events Datos Acceso */

    handleChangeTitulo(event) {
        this.handleChangeInput(event);
        this.valueTitulo = event.detail.value;
        this.onChangeButtomActiveAcceso(event);
    }

    handleChangeTipoEvau(event) {
        this.valueTipoEvau = event.detail.value;
        this.onChangeButtomActiveAcceso(event);
    }

    handleChangeTipoFp(event) {
        this.valueTipoFp = event.detail.value;
        this.onChangeButtomActiveAcceso(event);
    }


    handleClickStep1(event) {
        /* Paso 1 */
        this.formDatos[0].style.display = "block";
        this.formDatos[0].style.height = this.formDatosHeight + 'px';
        /* Paso 2 */
        this.formPaso2[0].style.display = "none";
        this.formPaso2[0].style.height = '0px';
    }

    onChangeButtomActive(event) {
        this.imagePng = myResource + '/clubresources/images/checked.png';
        this.fieldStatus = {};
        this.fieldStatus.label = event.target.name;
        console.log(event.target.value);

        if (event.target.value != '' && event.target.value != null) {
            this.fieldStatus.value = true;
        } else {
            this.fieldStatus.value = false;
        }

        this.objIndex = this.datosPersonalesFields.findIndex((obj => obj.label == event.target.name));

        if (this.objIndex < 0) {
            this.datosPersonalesFields.push(this.fieldStatus);
        } else {
            this.datosPersonalesFields[this.objIndex].label = event.target.name;
            this.datosPersonalesFields[this.objIndex].value = this.fieldStatus.value;
        }

        console.log(JSON.stringify(this.datosPersonalesFields));

        this.buttonActivation = 0;
        this.datosPersonalesFields.forEach(dP => {
            if (dP.value === false) {
                this.buttonActivation++
            }
        })
        console.log('this.buttonActivation: ' + this.buttonActivation);

        if (this.buttonActivation === 0) {
            this.step2Button.disabled = false;
        } else {
            this.step2Button.disabled = true;

        }
    }

    handleClickStep1(event) {
        /* Paso 1 */
        this.formDatos[0].style.display = "block";
        this.formDatos[0].style.height = this.formPaso2Height + 'px';
        /* Paso 2 */
        this.formPaso2[0].style.display = "none";
        this.formPaso2[0].style.height = '0px';
    }

    handleClickStep2(event) {
        /* Paso 1 */
        this.formDatos[0].style.display = "none";
        this.formDatos[0].style.height = '0px';
        /* Paso 2 */
        this.formPaso2[0].style.display = "block";
        this.formPaso2[0].style.height = this.formPaso2Height + 'px';
        /* Paso 3 */
        this.formPaso3[0].style.display = "none";
        this.formPaso3[0].style.height = '0px';
    }

    onChangeButtomActiveContacto(event) {
        this.fieldStatus = {};
        this.fieldStatus.label = event.target.name;
        console.log(event.target.value);

        if (event.target.value != '' && event.target.value != null) {
            this.fieldStatus.value = true;
        } else {
            this.fieldStatus.value = false;
        }

        this.objIndex = this.academicosFields.findIndex((obj => obj.label == event.target.name));

        if (this.objIndex < 0) {
            this.academicosFields.push(this.fieldStatus);
        } else {
            this.academicosFields[this.objIndex].label = event.target.name;
            this.academicosFields[this.objIndex].value = this.fieldStatus.value;
        }

        console.log(JSON.stringify(this.academicosFields));

        this.buttonActivationAcademicos = 0;
        this.academicosFields.forEach(dP => {
            if (dP.value === false) {
                this.buttonActivationAcademicos++
            }
        })
        console.log('this.buttonActivationAcademicos: ' + this.buttonActivationAcademicos);

        if (this.buttonActivationAcademicos === 0) {
            this.step3Button.disabled = false;
        } else {
            this.step3Button.disabled = true;

        }
    }

    onChangeButtomActiveAcceso(event) {
        this.fieldStatus = {};
        this.fieldStatus.label = event.target.name;

        if (event.target.value != '' && event.target.value != null) {
            this.fieldStatus.value = true;
        } else {
            this.fieldStatus.value = false;
        }


        if (this.valueTitulo == 1) {
            this.objIndex = this.evauFields.findIndex((obj => obj.label == event.target.name));
            if (this.objIndex < 0) {
                this.evauFields.push(this.fieldStatus);
            } else {
                this.evauFields[this.objIndex].label = event.target.name;
                this.evauFields[this.objIndex].value = this.fieldStatus.value;
            }
        } else if (this.valueTitulo == 2) {
            this.objIndex = this.fpFields.findIndex((obj => obj.label == event.target.name));
            if (this.objIndex < 0) {
                this.fpFields.push(this.fieldStatus);
            } else {
                this.fpFields[this.objIndex].label = event.target.name;
                this.fpFields[this.objIndex].value = this.fieldStatus.value;
            }
        } else if (this.valueTitulo == 3) {
            this.objIndex = this.noFinalizadosFields.findIndex((obj => obj.label == event.target.name));
            if (this.objIndex < 0) {
                this.noFinalizadosFields.push(this.fieldStatus);
            } else {
                this.noFinalizadosFields[this.objIndex].label = event.target.name;
                this.noFinalizadosFields[this.objIndex].value = this.fieldStatus.value;
            }
        } else if (this.valueTitulo == 4) {
            this.objIndex = this.mayores25Fields.findIndex((obj => obj.label == event.target.name));
            if (this.objIndex < 0) {
                this.mayores25Fields.push(this.fieldStatus);
            } else {
                this.mayores25Fields[this.objIndex].label = event.target.name;
                this.mayores25Fields[this.objIndex].value = this.fieldStatus.value;
            }
        } else if (this.valueTitulo == 5) {
            this.objIndex = this.extranjerosFields.findIndex((obj => obj.label == event.target.name));
            if (this.objIndex < 0) {
                this.extranjerosFields.push(this.fieldStatus);
            } else {
                this.extranjerosFields[this.objIndex].label = event.target.name;
                this.extranjerosFields[this.objIndex].value = this.fieldStatus.value;
            }
        }


        console.log(JSON.stringify(this.evauFields));
        console.log(JSON.stringify(this.fpFields));
        console.log(JSON.stringify(this.noFinalizadosFields));
        console.log(JSON.stringify(this.mayores25Fields));
        console.log(JSON.stringify(this.extranjerosFields));

        this.buttonActivationEvauAcceso = 0;
        this.evauFields.forEach(dP => {
            if (dP.value === false) {
                this.buttonActivationEvauAcceso++
            }
        })

        this.buttonActivationFpAcceso = 0;
        this.fpFields.forEach(dP => {
            if (dP.value === false) {
                this.buttonActivationFpAcceso++
            }
        })

        this.buttonActivationNoFinalizadosAcceso = 0;
        this.noFinalizadosFields.forEach(dP => {
            if (dP.value === false) {
                this.buttonActivationNoFinalizadosAcceso++
            }
        })

        this.buttonActivationMayores25Acceso = 0;
        this.mayores25Fields.forEach(dP => {
            if (dP.value === false) {
                this.buttonActivationMayores25Acceso++
            }
        })

        this.buttonActivationExtranjerosAcceso = 0;
        this.extranjerosFields.forEach(dP => {
            if (dP.value === false) {
                this.buttonActivationExtranjerosAcceso++
            }
        })

        console.log('this.buttonActivationEvauAcceso: ' + this.buttonActivationEvauAcceso);
        console.log('this.buttonActivationFpAcceso: ' + this.buttonActivationFpAcceso);
        console.log('this.buttonActivationNoFinalizadosAcceso: ' + this.buttonActivationNoFinalizadosAcceso);
        console.log('this.buttonActivationMayores25Acceso: ' + this.buttonActivationMayores25Acceso);
        console.log('this.buttonActivationExtranjerosAcceso: ' + this.buttonActivationExtranjerosAcceso);


        /* Form Options Titulos */

        this.formEvau.style.display = 'none';
        this.formFp.style.display = 'none';
        this.formNoFinalizados.style.display = 'none';
        this.formMayores25.style.display = 'none';
        this.formExtranjeros.style.display = 'none';
        this.formEvauSelectedAcceso = false;
        this.formNoFinalizadosSelectedAcceso = false;
        this.formMayores25SelectedAcceso = false;
        this.formExtranjerosSelectedAcceso = false;


        if (this.valueTitulo == 1) {
            this.formEvau.style.display = 'flex';
            this.formEvauSelectedAcceso = true;
        } else if (this.valueTitulo == 2) {
            this.formFp.style.display = 'flex';
            this.formFpSelectedAcceso = true;
        } else if (this.valueTitulo == 3) {
            this.formNoFinalizados.style.display = 'flex';
            this.formNoFinalizadosSelectedAcceso = true;
        } else if (this.valueTitulo == 4) {
            this.formMayores25.style.display = 'flex';
            this.formMayores25SelectedAcceso = true;
        } else if (this.valueTitulo == 5) {
            this.formExtranjeros.style.display = 'flex';
            this.formExtranjerosSelectedAcceso = true;
        }

        /* Disabled Button */

        if ((this.buttonActivationEvauAcceso === 0 && this.formEvauSelectedAcceso)
            || (this.buttonActivationFpAcceso === 0 && this.formFpSelectedAcceso)
            || (this.buttonActivationNoFinalizadosAcceso === 0 && this.formNoFinalizadosSelectedAcceso)
            || (this.buttonActivationMayores25Acceso === 0 && this.formMayores25SelectedAcceso)
            || (this.buttonActivationExtranjerosAcceso === 0 && this.formExtranjerosSelectedAcceso)) {
            this.stepSaveButton.disabled = false;
        } else {
            this.stepSaveButton.disabled = true;
        }

        console.log('event.target.value: ' + event.target.value)

    }


    handleClickStep3(event) {
        /* Paso 2 */
        this.formPaso2[0].style.display = "none";
        this.formPaso2[0].style.height = '0px';
        /* Paso 3 */
        this.formPaso3[0].style.display = "block";
        this.formPaso3[0].style.height = this.formPaso3Height + 'px';

    }

    
}