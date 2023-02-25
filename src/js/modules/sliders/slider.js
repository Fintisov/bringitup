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
        try {this.slides = this.container.children;} catch (e) {}
        this.prev = document.querySelectorAll(prev);
        this.next = document.querySelectorAll(next);
        this.activeClass = activeClass;
        this.slideIndex = 1;
        this.autoplay = autoplay;
        this.autoplayTime = autoplayTime;
    }
}
