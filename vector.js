class Vec2 {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
  subtract(other) {
    return new Vec2(this.x - other.x, this.y - other.y);
  }
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
