import { move } from "./utils/move";
import { draw } from "./utils/draw";
import { getScreen } from "./utils/screen";

export interface ILoc {
  x: number;
  y: number;
}

export const getResult = async (
  loc: ILoc,
  data: Buffer
): Promise<string | void> => {
  const [command, ...others] = String(data).split(/_| /g);

  if (command === "prnt") return getScreen();
  return command === "mouse" ? move(loc, others) : draw(loc, others);
};
