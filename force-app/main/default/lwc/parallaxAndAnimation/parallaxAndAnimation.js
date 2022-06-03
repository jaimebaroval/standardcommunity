import { LightningElement, track } from 'lwc';


export default class ParallaxAndAnimation extends LightningElement {

    // @track backgroundImage = ''

    renderedCallback() {

        setTimeout(() => {

            // backgroundImage = this.template.querySelectorAll('.logoImage');
            console.log(JSON.stringify(this.template.querySelectorAll('.logoImage')));

        }, 7000)
    }
}