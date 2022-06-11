"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parser = exports.serialport = void 0;
const serialport_1 = require("serialport");
(async () => {
    var _a;
    const path = (_a = (await serialport_1.SerialPort.list()).find((p) => (p.productId = "7523"))) === null || _a === void 0 ? void 0 : _a.path;
    console.log(path);
})();
let serialport = new serialport_1.SerialPort({
    path: "COM6",
    baudRate: 9600,
});
exports.serialport = serialport;
let interval;
const reconnectingPort = () => {
    if (!interval) {
        if (!serialport.isOpen) {
            serialport.close();
            interval = setInterval(() => {
                serialport.open();
            }, 1000);
        }
        else {
            clearInterval(interval);
        }
    }
};
const parser = serialport.pipe(new serialport_1.ReadlineParser({ delimiter: "\n" }));
exports.parser = parser;
serialport.on("end", (err) => console.log("end" + err));
serialport.on("close", () => {
    serialport.close();
    reconnectingPort();
});
serialport.resume();
serialport.on("error", () => {
    reconnectingPort();
});
serialport.on("resume", () => {
    clearInterval(interval);
});
serialport.on("open", () => {
    clearInterval(interval);
});
//# sourceMappingURL=serialPort.js.map