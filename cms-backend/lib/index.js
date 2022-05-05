"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const socket_io_1 = require("socket.io");
const serialPort_1 = require("./services/serialPort");
const cors = require("cors");
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
serialPort_1.parser.on("data", (data) => {
    const dataArr = data.replace("\r", "").split(", ");
    console.log(dataArr);
    const xArr = parseFloat(dataArr[0]) || 0;
    const yArr = parseFloat(dataArr[1]) || 0;
    const zArr = parseFloat(dataArr[2]) || 0;
    io.emit("accData", xArr, yArr, zArr);
});
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
//# sourceMappingURL=index.js.map