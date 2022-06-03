import { LightningElement, track } from 'lwc';

export default class ProcesoInscripcion extends LightningElement {

    // Datos Personales

    value = '1';

    get doctype() {
        return [
            { label: 'DNI', value: '1' },
            { label: 'NIF', value: '2' },
            { label: 'NIE', value: '3' },
        ];
    }

    get options() {
        return [
            { label: 'Si', value: true },
            { label: 'No', value: false }
        ];
    }

    @track anim = [];
    @track animAcademicos = [];
    @track animFacturacion = [];

    @track animSectionForm = [];

    @track procesoInfoForm = [];
    @track procesoInfoFormHeight;
    @track procesoInfoFormHeightAcademicos;
    @track animSectionFormAcademicos = [];
    @track procesoInfoFormAcademicos = [];
    @track procesoTitleFormAcademicos = [];

    @track animSectionFormFacturacion = [];
    @track procesoInfoFormFacturacion = [];
    @track procesoInfoFormHeightFacturacion;


    // MARK: FORM VALIDATION

    // Common Values

    @track fieldContent = {};
    @track objIndex;
    @track saveButtonForm;

    // Datos Personales

    @track datosPersonalesFieldsHTML = [];
    @track datosPersonalesCounter = 0;
    @track datosPersonalesCheck = false;

    // Datos Académicos

    @track datosAcademicosFieldsHTML = [];
    @track datosAcademicosCounter = 0;
    @track datosAcademicosCheck = false;

    // Datos Facturación

    @track datosFacturacionFieldsHTML = [];
    @track datosFacturacionCounter = 0;
    @track datosFacturacionCheck = false;

    connectedCallback() {

        setTimeout(() => {
            // Datos Personales
            this.anim = this.template.querySelectorAll('.anim-section-form .anim');
            this.animSectionForm = this.template.querySelectorAll('.anim-section-form');
            this.procesoInfoForm = this.template.querySelectorAll('.proceso-info-form');
            this.procesoInfoFormHeight = this.procesoInfoForm[0].clientHeight;

            // Form Validation
            this.datosPersonalesFieldsHTML = this.template.querySelectorAll('.dp-mu-input');
            this.sectionFormContent(this.datosPersonalesFieldsHTML, this.datosPersonalesValidation, 'dp-mu-input')

            // Datos Académicos
            this.animAcademicos = this.template.querySelectorAll('.anim-section-form-academicos .anim');
            this.animSectionFormAcademicos = this.template.querySelectorAll('.anim-section-form-academicos');
            this.procesoInfoFormAcademicos = this.template.querySelectorAll('.proceso-info-form-academicos');
            this.procesoInfoFormHeightAcademicos = this.procesoInfoFormAcademicos[0].clientHeight;

            // Form Validation
            this.datosAcademicosFieldsHTML = this.template.querySelectorAll('.da-mu-input');
            this.sectionFormContent(this.datosAcademicosFieldsHTML, this.datosAcademicosValidation, 'da-mu-input')

            // Datos Facturación
            this.animFacturacion = this.template.querySelectorAll('.anim-section-form-facturacion .anim');
            this.animSectionFormFacturacion = this.template.querySelectorAll('.anim-section-form-facturacion');
            this.procesoInfoFormFacturacion = this.template.querySelectorAll('.proceso-info-form-facturacion');
            this.procesoInfoFormHeightFacturacion = this.procesoInfoFormFacturacion[0].clientHeight;

            // Form Validation
            this.datosFacturacionFieldsHTML = this.template.querySelectorAll('.df-mu-input');
            this.sectionFormContent(this.datosFacturacionFieldsHTML, this.datosFacturacionValidation, 'df-mu-input')

            // Save Button
            this.saveButtonForm = this.template.querySelector('.save-button-disabled');

            // Forms Height
            this.procesoInfoFormAcademicos[0].style.height = '0px';
            this.animSectionFormAcademicos[0].style.transform = "scaleY(0)";
            this.procesoInfoFormFacturacion[0].style.height = '0px';
            this.animSectionFormFacturacion[0].style.transform = "scaleY(0)";

        }, 100)

    }

    formProcessValidation(event) {
        if (event.target.classList.value.includes('dp-mu-input')) {
            this.sectionFormContent(this.datosPersonalesFieldsHTML, 'dp-mu-input')
        } else if (event.target.classList.value.includes('da-mu-input')) {
            this.sectionFormContent(this.datosAcademicosFieldsHTML, 'da-mu-input')
        } else if (event.target.classList.value.includes('df-mu-input')) {
            this.sectionFormContent(this.datosFacturacionFieldsHTML, 'df-mu-input')
        }

        if (this.datosPersonalesCounter === 0 && this.datosPersonalesCheck
            && this.datosAcademicosCounter === 0 && this.datosAcademicosCheck
            && this.datosFacturacionCounter === 0 && this.datosFacturacionCheck) {
            this.saveButtonForm.classList.replace('save-button-disabled', 'button-validate');
        } else {
            this.saveButtonForm.classList.replace('button-validate', 'save-button-disabled');
        }

    }

    sectionFormContent(formSection, section) {
        this.datosPersonalesCounter = 0;
        this.datosAcademicosCounter = 0;
        this.datosFacturacionCounter = 0;

        formSection.forEach(fs => {
            if (fs.value == '' || fs.value == null) {
                if (section == 'dp-mu-input') {
                    this.datosPersonalesCounter++;
                } else if (section == 'da-mu-input') {
                    this.datosAcademicosCounter++;
                } else if (section == 'df-mu-input') {
                    this.datosFacturacionCounter++;
                }
            }
        })

        if (section == 'dp-mu-input') {
            this.datosPersonalesCounter === 0 ? this.datosPersonalesCheck = true : this.datosPersonalesCheck = false;
        } else if (section == 'da-mu-input') {
            this.datosAcademicosCounter === 0 ? this.datosAcademicosCheck = true : this.datosAcademicosCheck = false;
        } else if (section == 'df-mu-input') {
            this.datosFacturacionCounter === 0 ? this.datosFacturacionCheck = true : this.datosFacturacionCheck = false;
        }
    }


    handleChange(event) {
        this.formProcessValidation(event);
    }

    handlePressFacturacionForm() {
        this.animateForm('facturacion');
        this.menuOpen = 'facturacion';
    }

    handlePressAcademicosForm() {
        this.animateForm('academicos');
        this.menuOpen = 'academicos';
    }

    handlePressGeneralForm() {
        this.animateForm('general');
        this.menuOpen = 'general';
    }




    // MARK: ANIMATION

    animateForm(formSection) {
        if (formSection == 'general') {
            // Animacion Slide
            this.anim.forEach((a, idx) => {
                a.classList.replace('slide-out-top-anim', 'slide-in-top-anim');
                a.classList.add('delay' + (this.anim.length - idx));
            })
            this.animAcademicos.forEach((a, idx) => {
                a.classList.replace('slide-in-top-anim', 'slide-out-top-anim');
                a.classList.add('delay' + (this.anim.length - idx));
            })
            this.animFacturacion.forEach((a, idx) => {
                a.classList.replace('slide-in-top-anim', 'slide-out-top-anim');
                a.classList.add('delay' + (this.anim.length - idx));
            })

            this.animSectionForm[0].style.transform = "scaleY(1)";
            this.animSectionFormAcademicos[0].style.transform = "scaleY(0)";
            this.procesoInfoForm[0].style.height = this.procesoInfoFormHeight + 'px';
            this.procesoInfoFormAcademicos[0].style.height = '0px';
            this.animSectionFormFacturacion[0].style.transform = "scaleY(0)";
            this.procesoInfoFormFacturacion[0].style.height = '0px';

            this.animSectionForm.forEach((animSec) => {
                animSec.style.visibility = 'visible';
            })
            // this.procesoInfoFormAcademicos.forEach(animSec => {
            //     animSec.style.visibility = 'hidden';
            // })
        }
        if (formSection == 'academicos') {

            this.anim.forEach((a, idx) => {
                a.classList.replace('slide-in-top-anim', 'slide-out-top-anim');
                a.classList.add('delay' + (this.anim.length - idx));
            })
            this.animAcademicos.forEach((a, idx) => {
                a.classList.replace('slide-out-top-anim', 'slide-in-top-anim');
                a.classList.add('delay' + (this.anim.length - idx));
            })
            this.animFacturacion.forEach((a, idx) => {
                a.classList.replace('slide-in-top-anim', 'slide-out-top-anim');
                a.classList.add('delay' + (this.anim.length - idx));
            })
            this.animSectionForm[0].style.transform = "scaleY(0)";
            this.procesoInfoForm[0].style.height = '0px';
            this.procesoInfoFormAcademicos[0].style.height = this.procesoInfoFormHeightAcademicos + 'px';
            this.animSectionFormAcademicos[0].style.transform = "scaleY(1)";
            this.animSectionFormFacturacion[0].style.transform = "scaleY(0)";
            this.procesoInfoFormFacturacion[0].style.height = '0px';

            this.animSectionForm.forEach((animSec) => {
                animSec.style.visibility = 'hidden';
            })
            this.procesoInfoFormAcademicos.forEach(animSec => {
                animSec.style.visibility = 'visible';
            })

        }
        if (formSection == 'facturacion') {

            this.anim.forEach((a, idx) => {
                a.classList.replace('slide-in-top-anim', 'slide-out-top-anim');
                a.classList.add('delay' + (this.anim.length - idx));
            })
            this.animAcademicos.forEach((a, idx) => {
                a.classList.replace('slide-in-top-anim', 'slide-out-top-anim');
                a.classList.add('delay' + (this.anim.length - idx));
            })
            this.animFacturacion.forEach((a, idx) => {
                a.classList.replace('slide-out-top-anim', 'slide-in-top-anim');
                a.classList.add('delay' + (this.anim.length - idx));
            })
            this.animSectionForm[0].style.transform = "scaleY(0)";
            this.animSectionFormAcademicos[0].style.transform = "scaleY(0)";
            this.procesoInfoFormFacturacion[0].style.height = this.procesoInfoFormHeightAcademicos + 'px';
            this.animSectionFormFacturacion[0].style.transform = "scaleY(1)";
            this.procesoInfoForm[0].style.height = '0px';
            this.procesoInfoFormAcademicos[0].style.height = '0px';

            // this.procesoInfoFormAcademicos.forEach((animSec) => {
            //     animSec.style.visibility = 'hidden';
            // })
            this.procesoInfoFormFacturacion.forEach(animSec => {
                animSec.style.visibility = 'visible';
            })

        }

    }
}