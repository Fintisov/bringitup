export default class Sliders {
    constructor(page, btn) {
        this.page = document.querySelector(page);
        this.slides = this.page.children;
        this.btns = document.querySelectorAll(btn)
        this.slideIndex = 1;
    }

    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }

        if (n < 1) {
            this.slideIndex = this.slides.length;
        }

        this.slides.forEach(elem => {
            elem.style.display = "none";
        })

        this.slides[this.slideIndex - 1].style.display = "block";
    }

    plusSlides(x) {
        this.showSlides(this.slideIndex += x);
    }

    render() {
        this.btns.forEach(elem => {
            elem.addEventListener("click", () => {
                this.plusSlides(1);
            })

            elem.parentNode.previousElementSibling.addEventListener("click", (e) => {
                e.preventDefault();

                this.slideIndex = 1;
                this.showSlides(this.slideIndex)

            })
        })

        this.showSlides(this.slideIndex)
    }
}