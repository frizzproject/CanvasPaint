const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext('2d');

const ui = document.querySelector('.ui__bar');
const cursor = document.querySelector('.cursor');

/* ===== Settings ===== */
canvas.width = window.innerWidth;
canvas.height = window.innerHeight - ui.clientHeight;
let options = {
  w: canvas.width,
  h: canvas.height,
  pi: Math.PI,
  replayInterval: 10,
  radius: 6,
  color: '#000000',
  isMouseDown: false,
  coords: [],
}

/* ===== Paint ===== */
export function Paint() {
  // Control
  document.addEventListener("keydown", (e) => {
    switch (e.code) {
      // Save
      case 'KeyS':
      case 'KeyЫ': 
        save();
        break;
      // Replaying
      case 'KeyR':
      case 'KeyК':
        clear();
        replay();
        break;
      // Clear
      case 'KeyC':
      case 'KeyС':
        clear();
        break;
    }
  });
  ui.addEventListener('input', function(e) {
    switch (e.target.type) {
      case 'range':
      case 'number':
        sizeChange(this);
        break;
      case 'color': 
        colorChange();
        break;
    }

    // Choosing a brush size
    function sizeChange(el) {
      options.radius = (e.target.value) / 2;

      if (e.target == el.querySelector('input[type="range"]')) el.querySelector('input[type="number"]').value = el.querySelector('input[type="range"]').value;

      if (e.target == el.querySelector('input[type="number"]')) el.querySelector('input[type="range"]').value = el.querySelector('input[type="number"]').value;
    }
    // Color selection
    function colorChange() {
      options.color = e.target.value;
      document.documentElement.style.setProperty('--fill-clr', options.color);
    }
  })

  // Push
  canvas.addEventListener('mousedown', (e) => {
    options.isMouseDown = true;
  });
  // Push-up
  canvas.addEventListener("mouseup", (e) => {
    options.isMouseDown = false;
    ctx.beginPath();
    options.coords.push("mouseup");
  });
  // Move
  canvas.addEventListener('mousemove', (e) => {
      cursor.style.transform = `translate3d(calc(${e.clientX}px), calc(${e.clientY}px - 100%), 0)`;
      if (options.isMouseDown) {
          options.coords.push([e.clientX, e.clientY]);
  
          ctx.fillStyle = options.color;
          ctx.strokeStyle = options.color;
          ctx.lineWidth = options.radius * 2;
          ctx.lineTo(e.clientX, e.clientY);
          ctx.stroke();
  
          ctx.beginPath();
          ctx.arc(e.clientX, e.clientY, options.radius, 0, options.pi * 2);
          ctx.fill();
  
          ctx.beginPath();
          ctx.moveTo(e.clientX , e.clientY);
      }
  });

  // Replaying
  function replay() {
    options.color = JSON.parse(localStorage.getItem("picture"))[0];
    options.radius =JSON.parse(localStorage.getItem("picture"))[1];
    options.coords = JSON.parse(localStorage.getItem("picture"))[2];

    let timer = setInterval(() => {
        if (!options.coords.length) {
            clearInterval(timer);
            ctx.beginPath();
            return;
        }
        let crd = options.coords.shift();
        e = {
          clientX: crd["0"],
          clientY: crd["1"],
        };
        ctx.lineTo(e.clientX, e.clientY);
        ctx.stroke();

        ctx.beginPath();
        ctx.arc(e.clientX, e.clientY, options.radius, 0, options.pi * 2);
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(e.clientX , e.clientY);
    }, options.replayInterval);
  };
  // Saving
  function save() {
      localStorage.setItem("picture", JSON.stringify([options.color, options.radius, options.coords]));
  };
  // Clear
  function clear() {
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, options.w, options.h);
      ctx.beginPath();
      ctx.fillStyle = options.color;
  };

  return {
    // Update
    update() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight - ui.clientHeight;
    }
  }
}
