const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");
const cursor = document.querySelector(".cursor");
const ui = document.querySelector(".ui__bar");
const infoTarget = document.querySelector(".info");
const infoBar = document.querySelector(".info__bar");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - ui.clientHeight;
let w = canvas.width; // canvas width
let h = canvas.height; // canvas height
let PI = Math.PI; // PI
let isMouseDown = false; // Флаг зажатия
let coords = []; // координаты рисунка
let int = 20; // интервал реплея
let radius = 6; // радиус
let color = "#000000" // цвет пера
;
/* ===== Управление ===== */ document.addEventListener("keydown", (e)=>{
    switch(e.code){
        // Clear
        case "KeyS":
        case "Key\u042B":
            save();
            break;
        // Replaying
        case "KeyR":
        case "Key\u041A":
            coords = JSON.parse(localStorage.getItem("coords"));
            clearCanvas();
            replay();
            break;
        // Clear
        case "KeyC":
        case "Key\u0421":
            clearCanvas();
            break;
    }
});
ui.addEventListener("input", function(e) {
    switch(e.target.type){
        case "range":
        case "number":
            sizeChange(this);
            break;
        case "color":
            console.log("1");
            colorChange();
            break;
    }
    // выбор размера кисти
    function sizeChange(el) {
        radius = e.target.value / 2;
        if (e.target == el.querySelector('input[type="range"]')) el.querySelector('input[type="number"]').value = el.querySelector('input[type="range"]').value;
        if (e.target == el.querySelector('input[type="number"]')) el.querySelector('input[type="range"]').value = el.querySelector('input[type="number"]').value;
    }
    // выбор цвета
    function colorChange() {
        color = e.target.value;
        document.documentElement.style.setProperty("--fill-clr", color);
    }
});
/* ===== Интерфейс ===== */ infoTarget.addEventListener("mouseover", (e)=>classToggle(infoBar, "_isActive"));
infoTarget.addEventListener("mouseout", (e)=>classToggle(infoBar, "_isActive"));
/* ===== Paint ===== */ canvas.addEventListener("mousedown", (e)=>{
    isMouseDown = true;
});
canvas.addEventListener("mouseup", (e)=>{
    isMouseDown = false;
    ctx.beginPath();
    coords.push("mouseup");
});
canvas.addEventListener("mousemove", (e)=>{
    cursor.style.transform = `translate3d(calc(${e.clientX}px), calc(${e.clientY}px - 100%), 0)`;
    if (isMouseDown) {
        coords.push([
            e.clientX,
            e.clientY
        ]);
        ctx.fillStyle = color;
        ctx.strokeStyle = color;
        ctx.lineWidth = radius * 2;
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(e.clientX, e.clientY, radius, 0, PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }
});
function replay() {
    let timer = setInterval(()=>{
        if (!coords.length) {
            clearInterval(timer);
            ctx.beginPath();
            return;
        }
        let crd = coords.shift();
        e = {
            clientX: crd["0"],
            clientY: crd["1"]
        };
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();
        ctx.beginPath();
        ctx.arc(e.clientX, e.clientY, radius, 0, PI * 2);
        ctx.fill();
        ctx.beginPath();
        ctx.moveTo(e.clientX, e.clientY);
    }, int);
}
function save() {
    localStorage.setItem("coords", JSON.stringify(coords));
}
function clearCanvas() {
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, w, h);
    ctx.beginPath();
    ctx.fillStyle = color;
}
function classToggle(el, cls) {
    el.classList.contains(cls) ? el.classList.remove(cls) : el.classList.add(cls);
}

//# sourceMappingURL=index.cea00a9b.js.map
