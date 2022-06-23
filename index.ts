import { httpServer } from "./src/http_server/index";
import robot from "robotjs";
import { WebSocketServer, createWebSocketStream } from "ws";
import { getResult } from "./src/controller/controller";

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });

wss.on("connection", (ws) => {
  const stream = createWebSocketStream(ws, {
    encoding: "utf8",
    decodeStrings: false,
  });
  stream.on("data", async (chunk) => {
    const mouse = robot.getMousePos();
    const [res] = chunk.split(" ");

    const result = await getResult(mouse, chunk);
    stream.write(`${res} ${result || `${mouse.x},${mouse.y}`}`);
  });
});
