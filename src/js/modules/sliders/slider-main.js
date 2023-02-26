import Slider from "./slider";

export default class MainSlider extends Slider {
    constructor(prev, next, mainNextBtn) {
        super(prev, next, mainNextBtn);

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

    bindTriggers() {
        this.mainNextBtn.forEach(elem => {
            elem.addEventListener("click", () => {
                this.plusSlides(1);
            })

            elem.parentNode.previousElementSibling.addEventListener("click", (e) => {
                e.preventDefault();

                this.slideIndex = 1;
                this.showSlides(this.slideIndex)
            })
        })

        this.next.forEach(elem => {
            elem.addEventListener("click", () => {
                this.plusSlides(1);
            })
        })

        this.prev.forEach(elem => {
            elem.addEventListener("click", () => {
                this.plusSlides(-1);
            })
        })
    }

    render() {
        if (this.container) {
            try {
                this.hanson.style.display = "none";
                this.hanson.classList.add("animated");
            } catch (e) {
            }

            this.bindTriggers();

            this.showSlides(this.slideIndex)
        }
    }
}