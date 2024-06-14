import { ReadlineParser, SerialPort } from "serialport";
import { setPropertyValue } from "./storage";

const makeSerialPortConnection = async () => {
  const ports = await SerialPort.list();
  const portsWithFlag = ports.filter((port) =>
    (port.manufacturer as string).startsWith("Arduino")
  );
  if (portsWithFlag.length === 0)
    throw new Error("Arduino is not found in com ports");
  const comport = portsWithFlag[0].path;

  const port = new SerialPort({
    path: comport,
    baudRate: 19200,
  });
  port.open(() => {
    console.log("SerialPort is opened, on " + comport);
  });

  const parser = new ReadlineParser();
  port.pipe(parser);

  parser.on("data", (line) => {
    setPropertyValue("consumed", parseFloat(line));
  });

  return () => {
    port.write("r");
  };
};

export default makeSerialPortConnection;
