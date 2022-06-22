// import { decodedTextSpanIntersectsWith } from "typescript";
// import { ILoc } from "./types";
import robot from "robotjs";
import { move } from "./utils/move";
import { draw } from "./utils/draw";

// const commandList = [
//   "up",
//   "down",
//   "left",
//   "right",
//   "position",
//   "circle",
//   "quare",
//   "rectangle",
// ];
export interface ILoc {
  x: number;
  y: number;
}

export const getResult = async (data: Buffer) => {
  const [command, ...other] = String(data).split(/_| /g);
  const mouse = robot.getMousePos();

  console.log(mouse);

  const result = command === "mouse" ? move(mouse, other) : draw(mouse, other);

  // robot.moveMouse(result.x, result.y);

  // const currentCommand = commandList.find((c) => c === command);
  // const importedFunc = await import(`./${currentCommand}`);

  // return importedFunc();
  console.log(command);
  console.log(other);

  // console.log("com: ", command);
  // console.log("step: ", step);
};
