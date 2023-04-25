export function drawCircle(ctx, x, y, radius, fillStyle, strokeStyle) {
    ctx.beginPath();
    ctx.fillStyle = fillStyle;
    ctx.strokeStyle = strokeStyle;
    ctx.arc(x, y, radius, 0, 2 * Math.PI);
    ctx.fill()
}


export function distance(x1, y1, x2, y2) {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy);
}