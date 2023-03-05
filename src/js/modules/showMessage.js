export default class ShowMessage {
    constructor(trigger) {
        this.triggers = document.querySelectorAll(trigger);
    }

    showMessage(item) {
        item.classList.remove("fadeOut");
        item.style.display = "block";
        item.classList.add("animated", "fadeIn");
    }

    hiddenMessage(item) {
        item.classList.remove("fadeIn");
        item.classList.add("animated", "fadeOut");

        setTimeout(() => {
            item.style.display = "none";
        }, 500);
    }

    bindTriggers() {
        this.triggers.forEach(elem => {
            const message = elem.closest(".module__info-show").nextElementSibling;
            elem.addEventListener("click", () => {
                if (window.getComputedStyle(message).display === "none") {
                    this.showMessage(message);
                } else {
                    this.hiddenMessage(message);
                }
            })
        })
    }

    init() {
        this.bindTriggers();
    }
}