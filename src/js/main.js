import MainSlider from "./modules/sliders/slider-main";
import MiniSlider from "./modules/sliders/slider-mini";
import Player from "./modules/player";

window.addEventListener("DOMContentLoaded", () => {
    const mainSlider = new MainSlider({
        container: ".page",
        next: ".next"
    });
    mainSlider.render();

    const showUpSlide = new MiniSlider({
        container: ".showup__content-slider",
        prev: ".showup__prev",
        next: ".showup__next",
        activeClass: "card-active",
    })
    showUpSlide.init()

    const modulesSlider = new MiniSlider({
        container: ".modules__content-slider",
        next: ".slick-next",
        prev: ".slick-prev",
        activeClass: "card-active",
        autoplay: true,
    });
    modulesSlider.init();

    const feedSlider = new MiniSlider({
        container: ".feed__slider",
        prev: ".slick-prev",
        next: ".slick-next",
        activeClass: "feed__item-active",
    })
    feedSlider.init();

    const player = new Player(".play", ".overlay", ".close", "OJ7Cx9KsEO0");
    player.init();
})