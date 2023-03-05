export default class Download {
    constructor(trigger) {
        this.trigger = document.querySelectorAll(trigger);
        this.path = "./assets/img/Bitmap.jpg";
    }

    downloadFile() {
        const file = document.createElement("a");
        file.setAttribute("href", this.path);
        file.setAttribute("download", "");
        file.style.display = "none";

        document.body.appendChild(file);
        file.click();
        file.remove();
    }

    bindTrigger() {
        this.trigger.forEach(elem => {
            elem.addEventListener("click", (e) => {
                e.stopPropagation();
                this.downloadFile();
            })
        })
    }

    init() {
        this.bindTrigger();
    }
}