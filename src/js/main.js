import Sliders from "./modules/sliders";

window.addEventListener("DOMContentLoaded", ()=> {
    const slider = new Sliders(".page", ".next");
    slider.render();
})