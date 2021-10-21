import express from "express";

const server = express();
const port = 3333;

server.use(express.json());

server.get("/", (req, res) => {
  return res.json({ Message: "Project inicialized!" });
});

server.post("/courses", (req, res) => {
  const { name } = req.body;
  return res.json({ name });
});

server.listen(port, () => {
  console.log(`Server initialized! Access the link: http://localhost:${port}`);
});
