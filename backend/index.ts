import { SerialPort } from "serialport";
import { ReadlineParser } from "serialport";
import fastify from "fastify";
const server = fastify({ logger: false });

const PORT = process.env.PORT || 4002;
const COMPORT = process.env.COM || 3;

const port = new SerialPort({
  path: "COM" + COMPORT,
  baudRate: 9600,
});
port.open(() => {
  console.log("SerialPort is opened, on COM" + COMPORT);
});

const parser = new ReadlineParser();
port.pipe(parser);
let info = {
  wattsConsumed: 0,
};

parser.on("data", (line) => {
  info.wattsConsumed = parseFloat(line);
});

server.get("/serial", async () => {
  port.write("r");
  return info;
});

server.listen({ port: parseInt(PORT + "") }, (err) => {
  console.log("Server is started! Port is " + PORT);
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
