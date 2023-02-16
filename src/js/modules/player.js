export default class Player {
    constructor(trigger, modal, close) {
        this.triggerBtn = document.querySelectorAll(trigger);
        this.modal = document.querySelector(modal);
        this.closeModalBtn = this.modal.querySelector(close);
    }

    openModal() {
        this.triggerBtn.forEach(elem => {
            elem.addEventListener("click", () => {
                if (!this.modal.querySelector("iframe#frame")) {
                    let pathVideo = elem.getAttribute("data-url");
                    this.createPlayer(pathVideo);
                }

                this.modal.style.display = "flex";
            })
        })
    }

    closeModal() {
        this.closeModalBtn.addEventListener("click", () => {
            this.modal.style.display = "none";
            this.player.stopVideo();
        })
    }


    createPlayer(url) {
        this.player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: `${url}`,
        });
    }

    init() {
        this.openModal();
        this.closeModal();

        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";

        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
}