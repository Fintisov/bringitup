export default class Different {
    constructor(containerContent, itemsClass, showBtn) {
        this.container = document.querySelector(containerContent);
        this.items = this.container.querySelectorAll(itemsClass);
        this.itemsClass = itemsClass;
        this.showBtn = this.container.querySelector(showBtn);
        this.counterItems = 0;
    }

    showCard() {
        this.items[this.counterItems].style.display = "flex";
        this.items[this.counterItems].classList.add("fadeIn");
        this.counterItems++;

        if (this.counterItems === this.items.length - 1) {
            this.showBtn.closest(this.itemsClass).classList.add("fadeOut");
            setTimeout(() => {
                this.showBtn.closest(this.itemsClass).remove();
            }, 1000)
        }
    }

    hideCard() {
        this.items.forEach((elem, i, arr) => {
            elem.classList.add("animated")
            if (i !== arr.length - 1) {
                elem.style.display = "none"
            }
        })
    }

    bindTriggers() {
        const eventShowCard = () => {
            if (this.counterItems !== this.items.length - 2) {
                this.showCard();
            } else {
                this.showCard();
                this.showBtn.removeEventListener("click", eventShowCard);
            }
        }

        this.showBtn.addEventListener("click", eventShowCard);
    }

    init() {
        this.hideCard();
        this.bindTriggers();
    }
}