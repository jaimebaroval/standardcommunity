import { LightningElement, track, api } from 'lwc';

export default class OaSlider extends LightningElement {

    connectedCallback() {
    }
    
    renderedCallback() {
        var slider = this.template.querySelectorAll('.slider')[0];
        var sliderItems = this.template.querySelectorAll('.items')[0];
        var prev = this.template.querySelectorAll('.prev')[0];
        var next = this.template.querySelectorAll('.next')[0];
        var sliderDots = this.template.querySelectorAll('.slider-dots')[0];
        
        this.slide(slider, sliderItems, prev, next, sliderDots);

    }

    slide(wrapper, items, prev, next, dots) {
        var posX1 = 0,
            posX2 = 0,
            posInitial,
            posFinal,
            threshold = 100,
            slides = items.getElementsByClassName('slide'),
            slidesLength = slides.length,
            slideSize = items.getElementsByClassName('slide')[0].offsetWidth,
            firstSlide = slides[0],
            lastSlide = slides[slidesLength - 1],
            cloneFirst = firstSlide.cloneNode(true),
            cloneLast = lastSlide.cloneNode(true),
            index = 0,
            allowShift = true;


        // Clone first and last slide
        items.appendChild(cloneFirst);
        items.insertBefore(cloneLast, firstSlide);
        wrapper.classList.add('loaded');
        
        // Mouse and Touch events
        items.onmousedown = dragStart;
        
        // Touch events
        items.addEventListener('touchstart', dragStart);
        items.addEventListener('touchend', dragEnd);
        items.addEventListener('touchmove', dragAction);
        
        // Click events
        prev.addEventListener('click', function () { shiftSlide(-1) });
        next.addEventListener('click', function () { shiftSlide(1) } );
        
        // Transition events
        items.addEventListener('transitionend', checkIndex);

        function slideDotsDraw () {
          for(let x=0; x < slidesLength; x++) {
            if( x == index) {
              dots.innerHTML += '<span class="dot active"></span>'
            } else {
              dots.innerHTML += '<span class="dot"></span>'
            }
          }
        }

        function dragStart (e) {
            posInitial = items.offsetLeft;
            e = e || window.event;  
            e.preventDefault();

            
            if (e.type == 'touchstart') {
              posX1 = e.touches[0].clientX;
            } else {
              posX1 = e.clientX;
              document.onmouseup = dragEnd;
              document.onmousemove = dragAction;
            }
        }

        function dragAction (e) {
            e = e || window.event;
            
            if (e.type == 'touchmove') {
              posX2 = posX1 - e.touches[0].clientX;
              posX1 = e.touches[0].clientX;
            } else {
              posX2 = posX1 - e.clientX;
              posX1 = e.clientX;
            }
            items.style.left = (items.offsetLeft - posX2) + "px";
        }

        function dragEnd (e) {
            posFinal = items.offsetLeft;
            if (posFinal - posInitial < -threshold) {
              shiftSlide(1, 'drag');
            } else if (posFinal - posInitial > threshold) {
              shiftSlide(-1, 'drag');
            } else {
              items.style.left = (posInitial) + "px";
            }
        
            document.onmouseup = null;
            document.onmousemove = null;
        }

        function shiftSlide (dir, action) {
            items.classList.add('shifting');
            
            if (allowShift) {
              if (!action) { posInitial = items.offsetLeft; }
        
              if (dir == 1) {
                items.style.left = (posInitial - slideSize) + "px";
                index++;      
              } else if (dir == -1) {
                items.style.left = (posInitial + slideSize) + "px";
                index--;      
              }
            };
            
            allowShift = false;
        }

        function checkIndex () {
            
            items.classList.remove('shifting');
        
            if (index == -1) {
              items.style.left = -(slidesLength * slideSize) + "px";
              index = slidesLength - 1;
            }
        
            if (index == slidesLength) {
              items.style.left = -(1 * slideSize) + "px";
              index = 0;
            }
            
            allowShift = true;

            dots.innerHTML = '';

            slideDotsDraw();
          }
    }

}