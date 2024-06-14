import fastify from "fastify";
import cors from "@fastify/cors";
import makeSerialPortConnection from "./port";
import { getStorageDump, loadFromDrive } from "./storage";
const server = fastify({ logger: false });

const PORT = process.env.PORT || 4002;

loadFromDrive();

server.register(cors);

makeSerialPortConnection().then((ping) => setInterval(ping, 5000));

server.get("/info", async () => {
  return getStorageDump();
});

server.listen({ port: parseInt(PORT + "") }, (err) => {
  console.log("Server is started! Port is " + PORT);
  if (err) {
    server.log.error(err);
    process.exit(1);
  }
});
