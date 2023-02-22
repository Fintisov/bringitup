export default class Slider {
    constructor({
                    container = null,
                    prev = null,
                    next = null,
                    activeClass = null,
                    autoplay = false,
                    autoplayTime = 5000,
                }) {
        this.container = document.querySelector(container);
        this.slides = (this.container) ? this.container.children : null;
        this.prev = document.querySelectorAll(prev);
        this.next = document.querySelectorAll(next);
        this.activeClass = activeClass;
        this.slideIndex = 1;
        this.autoplay = autoplay;
        this.autoplayTime = autoplayTime;
    }
}
