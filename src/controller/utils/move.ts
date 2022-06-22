import { ILoc } from "../controller";

export const move = (loc: ILoc, data: string[]) => {
  const movement = data[0];
  const step: number = +data[1];
  let x: number = loc.x,
    y: number = loc.y;

  if (movement === "up") {
    y = loc.y - step;
  } else if (movement === "down") {
    y = loc.y + step;
  } else if (movement === "left") {
    x = loc.x - step;
  } else if (movement === "right") {
    x = loc.x + step;
  }

  return { x, y };
};
