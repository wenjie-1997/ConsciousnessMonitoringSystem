"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const socket_io_1 = require("socket.io");
const serialPort_1 = require("./services/serialPort");
const cors = require("cors");
const lock_1 = require("./lock");
const database1 = new lock_1.LocalDatabase("Database 1", null);
const database2 = new lock_1.LocalDatabase("Database 2", null);
async function saveDataToDatabases(data, db1, db2) {
    var _a;
    await db1.use();
    await db1.save(data);
    await db2.use();
    console.log(`Magnitude from ${db2.name}: ${(_a = (await db2.read())) === null || _a === void 0 ? void 0 : _a.magnitude}`);
    await db2.release();
    await db1.release();
    console.log("Save success");
}
saveDataToDatabases({
    magnitude: 1,
    rawData: [],
}, database1, database2);
saveDataToDatabases({
    magnitude: 1,
    rawData: [],
}, database2, database1);
const app = express();
const port = 8000;
app.get("/", (req, res) => res.send("Home page"));
app.use(cors());
const server = http.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
    },
});
io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("disconnect", () => {
        console.log("user disconnected");
    });
});
serialPort_1.parser.on("data", async (data) => {
    const dataArr = data.replace("\r", "").split(", ");
    // console.log(dataArr);
    const xArr = parseFloat(dataArr[0]) || 0;
    const yArr = parseFloat(dataArr[1]) || 0;
    const zArr = parseFloat(dataArr[2]) || 0;
    // await prisma.physicalMovement.create({
    //   data: {
    //     xAcceleration: xArr,
    //     yAcceleration: yArr,
    //     zAcceleration: zArr,
    //   },
    // });
    const mag = Math.pow(Math.pow(xArr, 2) + Math.pow(yArr, 2) + Math.pow(zArr, 2), 0.5);
    io.emit("accData", xArr, yArr, zArr, Math.abs(mag - 0.92));
});
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
//# sourceMappingURL=index.js.map