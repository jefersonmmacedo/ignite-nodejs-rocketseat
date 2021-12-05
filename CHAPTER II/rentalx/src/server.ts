import express from "express";
import { router } from "./routes";
import "./database";

const server = express();
const port = 3333;

server.use(express.json());
server.use(router);

server.get("/", (req, res) => {
  return res.json({ Message: "Project inicialized!" });
});

server.listen(port, () => {
  console.log(`Hello!. Server initialized! Access the link: http://localhost:${port}`);
});
