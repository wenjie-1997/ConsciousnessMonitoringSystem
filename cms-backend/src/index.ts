import * as express from "express";
import * as http from "http";
import { Server } from "socket.io";
import { parser, serialport } from "./services/serialPort";
import * as cors from "cors";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

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

parser.on("data", async (data: string) => {
  const dataArr = data.replace("\r", "").split(", ");
  // console.log(dataArr);

  const xArr: number = parseFloat(dataArr[0]) || 0;
  const yArr: number = parseFloat(dataArr[1]) || 0;
  const zArr: number = parseFloat(dataArr[2]) || 0;

  // await prisma.physicalMovement.create({
  //   data: {
  //     xAcceleration: xArr,
  //     yAcceleration: yArr,
  //     zAcceleration: zArr,
  //   },
  // });

  const mag = Math.pow(
    Math.pow(xArr, 2) + Math.pow(yArr, 2) + Math.pow(zArr, 2),
    0.5
  );

  io.emit("accData", xArr, yArr, zArr, Math.abs(mag - 0.98));
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
