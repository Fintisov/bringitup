export default class Player {
    constructor(trigger, modal, close) {
        this.triggerBtn = document.querySelectorAll(trigger);
        this.modal = document.querySelector(modal);
        this.closeModalBtn = this.modal.querySelector(close);
        this.onPlayerStateChange = this.onPlayerStateChange.bind(this);
    }

    openModal() {
        this.triggerBtn.forEach(elem => {
            elem.addEventListener("click", (e) => {
                e.preventDefault();
                if (!elem.closest(".module__video-item") || (elem.closest(".module__video-item").getAttribute("data-locked") === "false")) {
                    this.openVideoBtn = elem

                    if (this.modal.querySelector("iframe#frame")) {
                        this.modal.style.display = "flex";
                        if (elem.getAttribute("data-url") !== this.pathVideo) {
                            this.pathVideo = elem.getAttribute("data-url");
                            try {
                                this.player.loadVideoById({
                                    videoId: this.pathVideo,
                                });
                                this.player.stopVideo();
                            } catch (e) {
                                console.log(e)
                            }
                        }
                    } else {
                        this.pathVideo = elem.getAttribute("data-url");
                        this.createPlayer(this.pathVideo);
                        this.modal.style.display = "flex";
                    }
                }
            })
        })
    }

    unlockedVideo(elem) {
        try {
            const lockedVideoElements = elem.closest(".module__video").querySelectorAll("[data-locked='true']");

            if (lockedVideoElements.length > 0) {
                const iconPlay = elem.querySelector(".play__circle").cloneNode(true);
                const item = lockedVideoElements[0];

                item.setAttribute("data-locked", "false");
                item.querySelector(".play__circle.closed").after(iconPlay);
                item.querySelector(".play__circle.closed").remove();
                item.querySelector(".play__text.attention").textContent = "play video";
                item.querySelector(".play__text.attention").classList.remove("attention");
                item.style.filter = "none";
                item.style.opacity = "1";
            }
        } catch (e) {
            throw new Error(`Error in function unlockedVideo!
             Text Error: ${e}`);
        }
    }

    lockedVideo() {
        try {
            const lockedContent = document.querySelectorAll(".play__circle.closed");

            this.triggerBtn.forEach(elem => {
                elem.closest(".module__video-item").setAttribute("data-locked", "false");
            })

            lockedContent.forEach(elem => {
                elem.closest(".module__video-item").setAttribute("data-locked", "true");
            })
        } catch (e) {
        }
    }

    onPlayerStateChange(event) {
        if (event.data === 0) {
            this.unlockedVideo(this.openVideoBtn);
        }
    }

    closeModal() {
        this.closeModalBtn.addEventListener("click", () => {
            this.modal.style.display = "none";
            try {
                this.player.stopVideo();
            } catch (e) {
            }
        })
    }

    createPlayer(url) {
        this.player = new YT.Player('frame', {
            height: '100%',
            width: '100%',
            videoId: `${url}`,
            events: {
                "onStateChange": this.onPlayerStateChange,
            }
        });
    }

    init() {
        this.openModal();
        this.closeModal();
        this.lockedVideo();

        const tag = document.createElement('script');
        tag.src = "https://www.youtube.com/iframe_api";

        const firstScriptTag = document.getElementsByTagName('script')[0];
        firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
    }
}