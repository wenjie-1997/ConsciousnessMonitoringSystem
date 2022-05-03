import { ReadlineParser, SerialPort } from "serialport";

let serialport = new SerialPort({
  path: "COM7",
  baudRate: 9600,
});

let interval: any;

const reconnectingPort = () => {
  if (!interval) {
    if (!serialport.isOpen) {
      serialport.close();
      interval = setInterval(() => {
        serialport.open();
      }, 1000);
    } else {
      clearInterval(interval);
    }
  }
};
const parser = serialport.pipe(new ReadlineParser({ delimiter: "\n" }));

serialport.on("end", (err: any) => console.log("end" + err));
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

// parser.on("data", (data: any) => console.log(data));

export { serialport, parser };
