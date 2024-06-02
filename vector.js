class Vec2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  static get center() {
    return new Vec2(canvas.width / 2, canvas.height / 2);
  }

  subtract(other) {
    return new Vec2(this.x - other.x, this.y - other.y);
  }
  add(other) {
    return new Vec2(this.x + other.x, this.y + other.y);
  }
  multiply(scalar) {
    return new Vec2(this.x * scalar, this.y * scalar);
  }
  divide(scalar) {
    return new Vec2(this.x / scalar, this.y / scalar);
  }
}

const worldToScreen = (worldPos) => {
  return worldPos.subtract(cameraPos).multiply(gridSize).multiply(zoom);
}

const sizeToScreen = (worldSize) => {
  return worldSize.multiply(gridSize).multiply(zoom);
}

function v(params) {
  const arg = params[0].toLowerCase().replace("x=", "").replace("y=", "");
  if (arg == "" || arg == "0" || arg == "zero") return Vec2.zero;
  if (arg == "1" || arg == "one") return Vec2.one;
  if (arg == "top" || arg == "up" || arg == "n") return Vec2.up;
  if (arg == "bottom" || arg == "down" || arg == "s") return Vec2.down;
  if (arg == "left" || arg == "down" || arg == "w") return Vec2.left;
  if (arg == "right" || arg == "down" || arg == "e") return Vec2.right;
  const values = arg.split(" ");
  if (values.length != 2) throw new Error("Invalid Vector params");
  const x = parseFloat(values[0]);
  const y = parseFloat(values[1]);
  return new Vec2(x, y);
}
