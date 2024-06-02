/**
 * 
 * @param {Vec2} worldPos The start position of the rectangle
 * @param {Vec2} worldSize 
 */
const drawRect = (worldPos, worldSize) => {
    const pos = worldToScreen(worldPos);
    const size = sizeToScreen(worldSize);
    ctx.fillRect(pos.x, pos.y, size.x, size.y);
}