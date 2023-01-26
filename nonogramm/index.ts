import express from "express";
import bodyParser from "body-parser";
import Solver from "./solver/Solver";
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use((_, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

app.post("/solve", (req, res) => {
  console.log("hi")
  if (!req.body || !req.body.left || !req.body.up) {
    console.log(req.body)
    res.sendStatus(400)
  }
  else {
    console.log("solving")
    const solveGrid = new Solver(req.body.left, req.body.up);
    res.send(JSON.stringify(solveGrid.solve()));
  }
});

app.listen(8001);
console.log("server running", 8001);
