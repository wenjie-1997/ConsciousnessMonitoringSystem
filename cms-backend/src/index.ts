import * as express from "express";
import * as http from "http";
import { Server } from "socket.io";
import { parser, serialport } from "./services/serialPort";
import * as cors from "cors";
import { LocalDatabase } from "./lock";
import { PrismaClient } from "@prisma/client";
import { Net, Transition, Place } from "petri-net";

interface Data {
  rawData: number[];
  magnitude: number;
}

const database1 = new LocalDatabase<Data | null>("Database 1", null);
const database2 = new LocalDatabase<Data | null>("Database 2", null);
let xArr: number = 0;
let yArr: number = 0;
let zArr: number = 0;
let mag: number = 0;

async function saveDataToDatabases(
  data: Data,
  db1: LocalDatabase<Data | null>,
  db2: LocalDatabase<Data | null>
) {
  await db1.use();
  await db1.save(data);
  await db2.use();
  console.log(`Magnitude from ${db2.name}: ${(await db2.read())?.magnitude}`);
  await db2.release();
  await db1.release();
  console.log("Save success");
}

const app = express();
const port = 8000;

const p1 = new Place("p1");
const p2 = new Place("p2");

const t1 = new Transition("t1", [p1], [p2]);
const t2 = new Transition("t2", [p2], [p1]);

const net = new Net(p1);
net.ingest(1);

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

t1.on("fire", async () => {
  await saveDataToDatabases(
    {
      magnitude: mag,
      rawData: [xArr, yArr, zArr],
    },
    database1,
    database2
  ),
    t2.fire();
});

t2.on("fire", () => {
  saveDataToDatabases(
    {
      magnitude: mag,
      rawData: [xArr, yArr, zArr],
    },
    database2,
    database1
  );
});

parser.on("data", async (data: string) => {
  const dataArr = data.replace("\r", "").split(", ");

  xArr = parseFloat(dataArr[0]) || 0;
  yArr = parseFloat(dataArr[1]) || 0;
  zArr = parseFloat(dataArr[2]) || 0;

  mag = Math.pow(
    Math.pow(xArr, 2) + Math.pow(yArr, 2) + Math.pow(zArr, 2),
    0.5
  );
  t1.fire();

  // await Promise.all([
  //   saveDataToDatabases(
  //     {
  //       magnitude: mag,
  //       rawData: [xArr, yArr, zArr],
  //     },
  //     database1,
  //     database2
  //   ),

  //   saveDataToDatabases(
  //     {
  //       magnitude: mag,
  //       rawData: [xArr, yArr, zArr],
  //     },
  //     database2,
  //     database1
  //   ),
  // ]);

  io.emit("accData", xArr, yArr, zArr, Math.abs(mag - 0.98));
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
