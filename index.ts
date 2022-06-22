import Jimp from "jimp";
import { httpServer } from "./src/http_server/index";
import robot from "robotjs";
import { WebSocketServer } from "ws";
import { getResult } from "./src/controller/controller";

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  ws.on("message", (data: Buffer) => {
    // let res = robot.getMousePos();
    // console.log(typeof res.x);
    // const mouse = robot.getMousePos();

    const mouse = robot.getMousePos();
    // console.log(res);
    // console.log("Mouse is at x:" + mouse.x + " y:" + mouse.y);
    if (data.toString().includes("position")) {
      ws.send(`mouse_position ${mouse?.x.toString()},${mouse?.y.toString()}`);
    } else {
      getResult(mouse, data);
    }
  });
});
