'use scrict';

import { Paint } from "./paint";

const PAINT = new Paint(); // new Paint
const infoTarget = document.querySelector('.info'); // info trigger
const infoBar = document.querySelector('.info__bar'); // info banner

/* ===== Update canvas size ===== */
window.addEventListener('resize', function() {
  PAINT.update(); 
});

/* ===== Interface ===== */
infoTarget.addEventListener("mouseover", () => classToggle(infoBar, '_isActive'));
infoTarget.addEventListener("mouseout", () => classToggle(infoBar, '_isActive'));

/* ===== Class toggle ===== */
function classToggle(el, cls) {
  el.classList.contains(cls) ? el.classList.remove(cls) : el.classList.add(cls);
};