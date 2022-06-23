import robot from "robotjs";
import { ILoc } from "../controller";

export const draw = (loc: ILoc, data: string[]) => {
  const shape: string = data[0];
  const widthOrRadius: number = +data[1];
  const height: number = +data[2];

  if (shape !== "circle") {
    return squareOrRect(loc, widthOrRadius, height);
  }
  return circle(loc, widthOrRadius);
};

function squareOrRect(loc: ILoc, width: number, height: number) {
  robot.setMouseDelay(5);
  robot.mouseToggle("down");

  for (let x = loc.x; x <= loc.x + width; x += 1) {
    robot.dragMouse(x, loc.y);
  }
  for (let y = loc.y; y <= loc.y + (height || width); y += 1) {
    robot.dragMouse(loc.x + width, y);
  }
  for (let x = loc.x + width; x >= loc.x; x -= 1) {
    robot.dragMouse(x, loc.y + (height || width));
  }
  for (let y = loc.y + (height || width); y >= loc.y; y -= 1) {
    robot.dragMouse(loc.x, y);
  }
  robot.mouseToggle("up");
}

function circle(loc: ILoc, radius: number): void {
  robot.setMouseDelay(5);
  robot.mouseToggle("down");
  for (let i = 0; i <= Math.PI * 2; i += 0.01) {
    const x = loc.x + radius * Math.cos(i) - radius;
    const y = loc.y + radius * Math.sin(i);

    robot.dragMouse(x, y);
  }
  robot.mouseToggle("up");
}
