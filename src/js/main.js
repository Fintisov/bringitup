import Sliders from "./modules/sliders";
import Player from "./modules/player";

window.addEventListener("DOMContentLoaded", ()=> {
    const slider = new Sliders(".page", ".next");
    slider.render();

    const player = new Player(".play", ".overlay", ".close", "OJ7Cx9KsEO0");
    player.init();
})