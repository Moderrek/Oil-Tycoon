/**
 * @type {HTMLCanvasElement}
 */
let canvas = null;
/**
 * @type {CanvasRenderingContext2D}
 */
let ctx = null;
let cameraPos = v`20 10`;
let scaleGrid = 10;

const render = () => {
  if (!ctx) return;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  drawRect(v`0 0`, v`100 100`);
};

const gameLoop = () => {
  render();
  window.requestAnimationFrame(gameLoop);
}

const start = () => {
  canvas = document.getElementById("game-canvas");
  resizeCanvas();
  ctx = canvas.getContext("2d");

  let anchor = null;
  let lastMove = null;
  canvas.addEventListener("mousedown", (e) => {
    if (anchor) return;
    anchor = new Vec2(e.offsetX, e.offsetY);
    lastMove = anchor;
    console.log("down", anchor);
   });
  canvas.addEventListener("mousemove", (e) => { 
    if (!anchor) return;
    const currentPos = new Vec2(e.offsetX, e.offsetY);
    const delta = currentPos.subtract(lastMove);
    console.log("move", delta);
    cameraPos = cameraPos.subtract(delta);
    lastMove = currentPos;
    // render();
  });

  canvas.addEventListener("mouseup", (e) => {
    if (!anchor) return;
    anchor = null;
  });

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
  const x = Math.floor(e.offsetX / scaleGrid) * scaleGrid;
  const y = Math.floor(e.offsetY / scaleGrid) * scaleGrid;
  console.log(x, y);
  drawRect(new Vec2(x, y), new Vec2(scaleGrid, scaleGrid));
});
