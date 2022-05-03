import * as express from "express";
import * as http from "http";
import { Server } from "socket.io";
import { parser, serialport } from "./services/serialPort";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 3000;

app.get("/", (req: any, res: any) => res.send("Home page"));

io.on("connection", (socket: any) => {
  console.log("a user connected");
  socket.on("chat message", (msg: any) => {
    console.log("message: " + msg);
    parser.on("data", (data: any) => {
      console.log(data);
      io.emit("chat message", msg);
    });
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
    serialport.close();
  });
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
