const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
let ww, wh;

ctx.strokeStyle = "red";
ctx.shadowBlur = 50;
ctx.shadowColor = "hsla(0, 100%, 60%,0.5)";

const precision = 100;
const hearts = [];
let mouseMoved = false;

const resize = () => {
  ww = canvas.width = window.innerWidth;
  wh = canvas.height = window.innerHeight;
};

const move = (e) => {
  mouseMoved = true;
  const { clientX, clientY } = e.type === "move" ? e.touches[0] : e;
  hearts.push(new heart(clientX, clientY));
  hearts.push(new heart(clientX, clientY));
};

class heart {
  constructor(x, y) {
    this.x = x || Math.random() * ww;
    this.y = y || Math.random() * wh;
    this.size = Math.random() * 2 + 1;
    this.shadowBlur = Math.random() * 10;
    this.speedX = (Math.random() + 0.2 - 0.6) * 8;
    this.speedY = (Math.random() + 0.2 - 0.6) * 8;
    this.speedSize = Math.random() * 0.05 + 0.01;
    this.opacity = 1;
    this.vertices = [];

    for (let i = 0; i < precision; i++) {
      const step = (i / precision - 0.5) * (Math.PI * 2);
      const vector = {
        x: 15 * Math.pow(Math.sin(step), 3),
        y: -(
          13 * Math.cos(step) -
          5 * Math.cos(2 * step) -
          2 * Math.cos(3 * step) -
          Math.cos(4 * step)
        ),
      };
      this.vertices.push(vector);
    }
  }

  draw() {
    this.size -= this.speedSize;
    this.x += this.speedX;
    this.y += this.speedY;

    ctx.save();
    ctx.translate(-1000, this.y);
    ctx.scale(this.size, this.size);
    ctx.beginPath();

    for (const vector of this.vertices) {
      ctx.lineTo(vector.x, vector.y);
    }

    ctx.globalAlpha = this.size;
    ctx.shadowBlur = Math.round((3 - this.size) * 10);
    ctx.shadowColor = "hsla(0, 100%, 60%,0.5)";
    ctx.shadowOffsetX = this.x + 1000;
    ctx.globalCompositeOperation = "screen";
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}
function render(a) {
  requestAnimationFrame(render);

  hearts.push(new heart());
  ctx.clearRect(0, 0, ww, wh);
  for (var i = 0; i < hearts.length; i++) {
    hearts[i].draw();
    if (hearts[i].size <= 0) {
      hearts.splice(i, 1);
      i--;
    }
  }
}
resize();
window.addEventListener("mousemove", move);
window.addEventListener("move", move);
window.addEventListener("resize", resize);
requestAnimationFrame(render);