import Slider from "./slider";

export default class MiniSlider extends Slider {
    constructor({container, prev, next, activeClass, autoplay, autoplayTime}) {
        super({container, prev, next, activeClass, autoplay, autoplayTime});
        this.autoplayId = null;
    }

    showNextSlide() {
        let btnCount = 0;

        this.slides.forEach(elem => {
            elem.classList.remove(this.activeClass);
            if (elem.closest("button")) {
                btnCount++;
            }
        })


        this.slides[(this.slides.length - 1) - btnCount].after(this.slides[0]);
        this.slides[0].classList.add(this.activeClass);
    }

    showPrevSlide() {
        let btnCount = 0;

        this.slides.forEach(elem => {
            elem.classList.remove(this.activeClass);
            if (elem.closest("button")) {
                btnCount++;
            }
        })

        this.slides[0].before(this.slides[(this.slides.length - 1) - btnCount]);
        this.slides[0].classList.add(this.activeClass);
    }

    autoplayInit() {
        this.autoplayId = setInterval(() => {
            this.showNextSlide()
        }, this.autoplayTime);

        this.container.addEventListener("mouseenter", () => {
            clearInterval(this.autoplayId);
        })

        this.container.addEventListener("mouseleave", () => {
            this.autoplayId = setInterval(() => {
                this.showNextSlide()
            }, this.autoplayTime);
        })
    }

    init() {
        this.container.style.cssText = `
            display: flex; 
            flex-wrap: wrap;
            overflow: hidden;
            align-items: flex-start;
        `;

        this.prev.forEach(elem => {
            elem.addEventListener("click", () => {
                this.showPrevSlide();
            })
        });

        this.next.forEach(elem => {
            elem.addEventListener("click", () => {
                this.showNextSlide();
            })
        });

        if (this.autoplay === true) {
            this.autoplayInit();
        }
    };
}