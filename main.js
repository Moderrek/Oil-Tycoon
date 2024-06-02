/**
 * @type {HTMLCanvasElement}
 */
let canvas = null;
/**
 * @type {CanvasRenderingContext2D}
 */
let ctx = null;
let cameraPos = v`0 0`;
let gridSize = 10;
let zoom = 1;
/**
 * @type {Game}
 */
let game = null;

const render = () => {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  drawRect(v`0 0`, v`10 10`);

  ctx.fillStyle = "red";
  drawRect(v`0 0`, v`1 1`);

  ctx.fillStyle = "blue";
  drawRect(v`10 10`, v`10 10`);

};

const gameLoop = () => {
  // render();
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  game.gameobjects.forEach((go) => go._update());
  game.gameobjects.forEach((go) => go._draw());
  
  window.requestAnimationFrame(gameLoop);
}

const start = () => {
  canvas = document.getElementById("game-canvas");
  resizeCanvas();
  ctx = canvas.getContext("2d");
  game = new Game();
  // cameraPos = new Vec2(canvas.width / 2, canvas.height / 2);

  let anchor = null;
  let lastMove = null;
  canvas.addEventListener("mousedown", (e) => {
    if (anchor) return;
    anchor = new Vec2(e.offsetX, e.offsetY);
    lastMove = anchor;
   });
  canvas.addEventListener("mousemove", (e) => { 
    if (!anchor) return;
    const currentPos = new Vec2(e.offsetX, e.offsetY);
    const delta = currentPos.subtract(lastMove).divide(zoom).divide(10);
    
    cameraPos = cameraPos.subtract(delta);
    lastMove = currentPos;
  });

  canvas.addEventListener("mouseup", (e) => {
    if (!anchor) return;
    anchor = null;
  });

  canvas.addEventListener("wheel", (e) => {
    const delta = e.deltaY;
    if (delta > 0) zoom -= 0.1;
    else zoom += 0.1;

    // cameraPos = cameraPos.add(new Vec2(e.offsetX, e.offsetY).divide(2 * gridSize));
  });

  Instiantiate(CreateSprite(v`0 0`, v`10 10`));
  Instiantiate(CreateSprite(v`15 15`, v`3 4`));

  alert("Click and drag to move the camera\nScroll to zoom in/out")

  window.requestAnimationFrame(gameLoop);
};

/**
 * Resize canvas to fit window size
 * @param {boolean} rerender Do re-render after resizing
 */
const resizeCanvas = (rerender) => {
  if (!canvas) return;
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  if (rerender) render();
};

document.addEventListener("DOMContentLoaded", start);
window.addEventListener("resize", () => resizeCanvas(true));
document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowUp") cameraPos.y--;
  if (e.key === "ArrowDown") cameraPos.y++;
  if (e.key === "ArrowLeft") cameraPos.x--;
  if (e.key === "ArrowRight") cameraPos.x++;
  render();
});
document.addEventListener("mousemove", (e) => {
  const x = Math.floor(e.offsetX / zoom) * zoom;
  const y = Math.floor(e.offsetY / zoom) * zoom;
  drawRect(new Vec2(x, y), new Vec2(zoom, zoom));
});
