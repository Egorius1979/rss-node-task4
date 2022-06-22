import { move } from "./utils/move";
import { draw } from "./utils/draw";

export interface ILoc {
  x: number;
  y: number;
}

export const getResult = async (loc: ILoc, data: Buffer) => {
  const [command, ...others] = String(data).split(/_| /g);

  command === "mouse" ? move(loc, others) : draw(loc, others);

  // if (others[0] === "position") return mouse;

  // robot.moveMouse(result.x, result.y);

  // const currentCommand = commandList.find((c) => c === command);
  // const importedFunc = await import(`./${currentCommand}`);

  // return importedFunc();
  console.log(command);
  console.log(others);

  // console.log("com: ", command);
  // console.log("step: ", step);
};
