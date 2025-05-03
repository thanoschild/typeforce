import { createServer } from "node:http";
import express from "express";

const PORT = 8080;

const app = express();
const httpServer = createServer(app);

app.get("/", (req, res) => {
  res.send("Server is up and running!");
});

httpServer.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
