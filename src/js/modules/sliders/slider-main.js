import Slider from "./slider";

export default class MainSlider extends Slider {
    constructor(next) {
        super(next);

        this.hanson = document.querySelector(".hanson");
    }

    showSlides(n) {
        if (n > this.slides.length) {
            this.slideIndex = 1;
        }

        if (n < 1) {
            this.slideIndex = this.slides.length;
        }

        try {
            this.hanson.style.display = "none";
            this.hanson.classList.remove("slideInUp");

            if (n === 3) {
                setTimeout(() => {
                    this.hanson.style.display = "block";
                    this.hanson.classList.add("slideInUp");
                }, 3000);
            }
        } catch (e) {
            console.log(e)
        }

        this.slides.forEach(elem => {
            elem.classList.add("animated");
            elem.classList.remove("fadeIn");
            elem.style.display = "none";
        });

        this.slides[this.slideIndex - 1].style.display = "block";
        this.slides[this.slideIndex - 1].classList.add("fadeIn");
    }

    plusSlides(x) {
        this.showSlides(this.slideIndex += x);
    }

    render() {
        try {
            this.hanson.style.display = "none";
            this.hanson.classList.add("animated");
        } catch (e) {
            console.log(e)
        }

        this.next.forEach(elem => {
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