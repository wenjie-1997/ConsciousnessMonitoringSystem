import * as express from "express";
import * as http from "http";
import { Server } from "socket.io";
import { parser, serialport } from "./services/serialPort";
import * as cors from "cors";

const app = express();

const port = 8000;

app.get("/", (req: any, res: any) => res.send("Home page"));
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
  },
});

io.on("connection", (socket: any) => {
  console.log("a user connected");

  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

parser.on("data", (data: string) => {
  const dataArr = data.replace("\r", "").split(", ");
  console.log(dataArr);
  const xArr: number = parseFloat(dataArr[0]) || 0;
  const yArr: number = parseFloat(dataArr[1]) || 0;
  const zArr: number = parseFloat(dataArr[2]) || 0;
  io.emit("accData", xArr, yArr, zArr);
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
