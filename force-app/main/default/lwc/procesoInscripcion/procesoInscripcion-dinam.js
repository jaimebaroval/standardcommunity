import { LightningElement, track } from 'lwc';

export default class ProcesoInscripcion extends LightningElement {

    // Datos Personales

    value = '1';

    get options() {
        return [
            { label: 'DNI', value: '1' },
            { label: 'NIF', value: '2' },
            { label: 'NIE', value: '3' },
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
    @track datosPersonalesOk = false;
    @track animSectionFormItems = [];

    connectedCallback() {
        setTimeout(() => {
            // Datos Personales
            // this.anim = this.template.querySelectorAll('.anim');
            this.animSectionForm = this.template.querySelectorAll('.anim-section-form');
            this.animSectionFormAnim = this.animSectionForm[0].querySelectorAll('.anim');
            // this.animSectionForm[0].querySelectorAll('.anim');
            this.procesoInfoForm = this.template.querySelectorAll('.proceso-info-form');
            this.procesoInfoFormHeight = this.procesoInfoForm[0].clientHeight;

            // Datos Académicos
            // this.animAcademicos = this.template.querySelectorAll('.anim-section-form-academicos .anim');
            // this.animSectionFormAcademicos = this.template.querySelectorAll('.anim-section-form-academicos');
            this.procesoInfoFormAcademicos = this.template.querySelectorAll('.proceso-info-form-academicos');
            this.procesoInfoFormHeightAcademicos = this.procesoInfoFormAcademicos[0].clientHeight;

            // Datos Facturación
            // this.animFacturacion = this.template.querySelectorAll('.anim-section-form-facturacion .anim');
            // this.animSectionFormFacturacion = this.template.querySelectorAll('.anim-section-form-facturacion');
            // this.procesoInfoFormFacturacion = this.template.querySelectorAll('.proceso-info-form-facturacion');

            // Forms Height
            this.procesoInfoFormAcademicos[0].style.height = '0px';
            // this.animSectionFormAcademicos[0].style.transform = "scaleY(0)";

            this.animSectionFormItems = this.animSectionForm.forEach(item => {
                console.log(item);
            })

            // console.log(JSON.stringify(this.animSectionFormItems));
            // console.log('this.animSectionForm: ', this.animSectionForm.querySelectorAll('.anim'));
            // console.log('this.anim: ', this.anim);
            // console.log('this.animSectionForm: ', this.animSectionForm);


        }, 100)

    }

    handleChange(event) {
        this.value = event.detail.value;
    }

    handlePressAcademicosForm() {
        this.animateForm('academicos');
    }

    handlePressGeneralForm() {
        this.animateForm('general');
    }

    animateForm(formSection) {
        if (formSection == 'general') {
            // Animacion Slide
            this.animSectionFormItems[0].forEach((a, idx) => {
                a.classList.replace('slide-out-top-anim', 'slide-in-top-anim');
            })
            this.animAcademicos.forEach((a, idx) => {
                a.classList.replace('slide-in-top-anim', 'slide-out-top-anim');
                console.log(a);
            })
            this.animSectionForm[0].style.transform = "scaleY(1)";
            this.animSectionForm[1].style.transform = "scaleY(0)";
            this.procesoInfoForm[0].style.height = this.procesoInfoFormHeight + 'px';
            this.procesoInfoFormAcademicos[0].style.height = '0px';
            this.animSectionForm.forEach((animSec) => {
                animSec.style.visibility = 'visible';
            })
            this.procesoInfoFormAcademicos.forEach(animSec => {
                animSec.style.visibility = 'hidden';
            })
        }
        if (formSection == 'academicos') {

            this.animSectionFormItems[0].forEach((a, idx) => {
                a.classList.replace('slide-in-top-anim', 'slide-out-top-anim');
                a.classList.add('delay' + (this.anim.length - idx));
            })
            this.animAcademicos.forEach((a, idx) => {
                a.classList.replace('slide-out-top-anim', 'slide-in-top-anim');
                a.classList.add('delay' + (this.anim.length - idx));
            })
            this.animSectionForm[0].style.transform = "scaleY(0)";
            this.animSectionForm[1].style.transform = "scaleY(1)";
            this.procesoInfoFormAcademicos[0].style.height = this.procesoInfoFormHeightAcademicos + 'px';
            this.procesoInfoForm[0].style.height = '0px';

            this.animSectionForm.forEach((animSec) => {
                animSec.style.visibility = 'hidden';
            })
            this.procesoInfoFormAcademicos.forEach(animSec => {
                animSec.style.visibility = 'visible';
            })

        }

        console.log(this.procesoInfoFormHeightAcademicos);
        console.log(this.procesoInfoFormHeight);

    }
}