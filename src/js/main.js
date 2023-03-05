import MainSlider from "./modules/sliders/slider-main";
import MiniSlider from "./modules/sliders/slider-mini";
import Player from "./modules/player";
import Different from "./modules/different";
import Forms from "./modules/forms";
import ShowMessage from "./modules/showMessage";

window.addEventListener("DOMContentLoaded", () => {
    const mainPageSlider = new MainSlider({
        container: ".page",
        mainNextBtn: ".next"
    });
    mainPageSlider.init();

    const modulePageSlider = new MainSlider({
        container: ".moduleapp",
        mainNextBtn: ".next",
        next: ".nextmodule",
        prev: ".prevmodule",
    });
    modulePageSlider.init();

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

    new Player(".play", ".overlay", ".close").init();
    new Player(".module__video-item .play", ".overlay", ".close").init();

    new Different(".officerold", ".officer__card-item", ".plus").init();
    new Different(".officernew", ".officer__card-item", ".plus").init();

    new Forms("form", "./assets/question.php").init();

    new ShowMessage(".module__info-show .plus", ".module__info .msg").init();
})