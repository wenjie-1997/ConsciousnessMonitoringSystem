"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express = require("express");
const http = require("http");
const socket_io_1 = require("socket.io");
const serialPort_1 = require("./services/serialPort");
const app = express();
const server = http.createServer(app);
const io = new socket_io_1.Server(server);
const port = 3000;
app.get("/", (req, res) => res.send("Home page"));
io.on("connection", (socket) => {
    console.log("a user connected");
    socket.on("chat message", (msg) => {
        console.log("message: " + msg);
        serialPort_1.parser.on("data", (data) => {
            console.log(data);
            io.emit("chat message", msg);
        });
    });
    socket.on("disconnect", () => {
        console.log("user disconnected");
        serialPort_1.serialport.close();
    });
});
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});
//# sourceMappingURL=index.js.map