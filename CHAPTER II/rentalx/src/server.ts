import express from "express";

import { categoriesRoutes } from "./routes/categories.routes";

const server = express();
const port = 3333;

server.use(express.json());
server.use("/categories", categoriesRoutes);

server.get("/", (req, res) => {
    return res.json({ Message: "Project inicialized!" });
});

server.listen(port, () => {
    console.log(
        `Server initialized! Access the link: http://localhost:${port}`
    );
});
