import express from "express";
import cors from 'cors'
import { todoRouter } from "./todo";
import { dbSetup } from "data-access/dbSetup";

const app = express();
const port = 3000;

dbSetup()

app.use(cors())
app.use(express.json())

app.use('/api', todoRouter)

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});
