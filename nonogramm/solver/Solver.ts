import { Orientation, SquareValue } from "../types";
import { blockColArr, blockRowArr } from "./BlockArr";
import Square from "./Square";

class Solver {
  cols_number: number;
  row_number: number;
  grid: Square[][];
  rows: blockRowArr[];
  cols: blockColArr[];

  constructor(left: number[][], up: number[][]) {
    this.grid = [];
    this.rows = [];
    this.cols = [];
    this.row_number = left.length;
    this.cols_number = up[0].length;

    this.initialize(left, up);
  }

  initialize(left: number[][], up: number[][]) {
    for (let i = 0; i < this.row_number; i++) {
      this.grid.push([]);
      this.rows[i] = new blockRowArr(i, this.grid[i], Orientation.row, left);
      for (let j = 0; j < this.cols_number; j++) {
        if (!i) this.cols[j] = new blockColArr(up, j, Orientation.col); //for every col in the first row create a colBlockArr
        this.grid[i].push(new Square(i, j, this.rows[i], this.cols[j]));
        this.cols[j].pushSquare(this.grid[i][j]);
        if (i === this.row_number - 1) this.cols[j].setBorder();
      }
      this.rows[i].setBorder();
    }
  }
  ColorSquare(row: number, col: number) {
    this.grid[row][col].black();
  }
  goThrogh() {
    this.rows.forEach((row) => {
      row.goThrough();
    });
    this.cols.forEach((col) => {
      col.goThrough();
    });
  }

  getGrid() {
    return this.grid.map((row) => row.map((square) => square.value));
  }

  solve() {
    let i = 0;
    try {
      while (
        i < 20 &&
        !this.grid.every((row) =>
          row.every((square) => square.value !== SquareValue.white)
        )
      ) {
        i++;
        this.goThrogh();
        // console.log("******************************************", i);
      }
    }
    catch (error) {
      console.error(error);
    }
    return this.getGrid();
  }
}
export default Solver;
