/**
 * 
 * @param {Vec2} start The start position of the rectangle
 * @param {Vec2} size 
 */
const drawRect = (start, size) => {
    ctx.fillRect(start.x - cameraPos.x, start.y - cameraPos.y, size.x, size.y);
}