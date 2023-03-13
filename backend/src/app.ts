import express from "express";
import { todoRouter } from "./todo";

const app = express();
const port = 3000;

app.use(express.json())

app.use('/api', todoRouter)

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
