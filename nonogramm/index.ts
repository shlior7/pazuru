import express from "express";
import bodyParser from "body-parser";
import Solver from "./solver/Solver";
import puzzle from './nonograms/Deer15X15.json'
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
    const solveGrid = new Solver(req.body.left, req.body.up);
    res.send(JSON.stringify(solveGrid.solve()));
  }
});

app.listen(8001);
console.log("server running", 8001);



// const solveGrid = new Solver(puzzle.left, puzzle.up);
// solveGrid.solve()
