import Jimp from "jimp";
import robot from "robotjs";

export const getScreen = async (): Promise<string> => {
  const screenSize = robot.getScreenSize();
  const loc = robot.getMousePos();
  const size = 200;
  let x: number = loc.x - size / 2,
    y: number = loc.y - size / 2;

  if (loc.x - size / 2 < 0) {
    x = 0;
  }
  if (loc.x + size / 2 > screenSize.width) {
    x = screenSize.width - size;
  }
  if (loc.y - size / 2 < 0) {
    y = 0;
  }
  if (loc.y + size / 2 > screenSize.height) {
    y = screenSize.height - size;
  }

  let img = robot.screen.capture(x, y, size, size).image;

  const jimp = new Jimp({ data: img, width: size, height: size });
  const resultImg = await jimp.getBase64Async(Jimp.MIME_PNG);
  return resultImg.split(",")[1];
};
