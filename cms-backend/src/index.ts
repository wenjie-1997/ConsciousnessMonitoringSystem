import * as express from "express";
import * as http from "http";
import { Server } from "socket.io";
import { parser, serialport } from "./services/serialPort";
import * as cors from "cors";
import { LocalDatabase } from "./lock";

interface Data {
  rawData: number[];
  magnitude: number;
}

const database1 = new LocalDatabase<Data | null>("Database 1", null);
const database2 = new LocalDatabase<Data | null>("Database 2", null);

async function saveDataToDatabases(data: Data, db1: LocalDatabase<Data | null>, db2: LocalDatabase<Data | null>) {
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

  const mag = Math.pow(Math.pow(xArr, 2) + Math.pow(yArr, 2) + Math.pow(zArr, 2), 0.5);

  await Promise.all([
    saveDataToDatabases(
      {
        magnitude: 1,
        rawData: [],
      },
      database1,
      database2
    ),

    saveDataToDatabases(
      {
        magnitude: 1,
        rawData: [],
      },
      database2,
      database1
    ),
  ]);

  io.emit("accData", xArr, yArr, zArr, Math.abs(mag - 0.92));
});

server.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
