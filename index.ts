import { httpServer } from "./src/http_server/index";
import robot from "robotjs";
import { WebSocketServer, createWebSocketStream } from "ws";
import { getResult } from "./src/controller/controller";
import internal from "stream";

const HTTP_PORT = 3000;

console.log(`Start static http server on the ${HTTP_PORT} port!`);
httpServer.listen(HTTP_PORT);

const wss = new WebSocketServer({ port: 8080 });
console.log(wss.options);

wss.on("connection", (ws) => {
  const stream: internal.Duplex = createWebSocketStream(ws, {
    encoding: "utf8",
    decodeStrings: false,
  });
  stream.on("data", async (chunk) => {
    const mouse = robot.getMousePos();
    const [message] = chunk.split(" ");

    const result: string | void = await getResult(mouse, chunk);
    console.log(`${chunk} (success)`);
    stream.write(`${message} ${result || `${mouse.x},${mouse.y}\0`}`);
  });
  // ws.on("close", () => console.log("\nthe client closed the connection"));
});

process.on("SIGINT", () => {
  wss.close();
  console.log("\nWebsocket server connection has closed");
  process.exit();
});
