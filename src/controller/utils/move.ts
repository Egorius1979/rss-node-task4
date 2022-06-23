import { ILoc } from "../controller";
import robot from "robotjs";

export const move = (loc: ILoc, data: string[]): void => {
  const movement = data[0];
  const step: number = +data[1];
  let x: number = loc.x,
    y: number = loc.y;

  if (movement === "up") {
    y -= step;
  } else if (movement === "down") {
    y += step;
  } else if (movement === "left") {
    x -= step;
  } else if (movement === "right") {
    x += step;
  }

  robot.moveMouse(x, y);
};
