import { Orientation, SquareValue } from "../types";
import { RowBlockList } from "./BlockRowArr";
import { ColumnBlockList } from "./BlockColumnArr";
import Square from "./Square";

class Solver {
  cols_number: number;
  row_number: number;
  grid: Square[][];
  rows: RowBlockList[];
  cols: ColumnBlockList[];

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
      this.rows[i] = new RowBlockList(i, this.grid[i], Orientation.row, left);
      for (let j = 0; j < this.cols_number; j++) {
        if (!i) this.cols[j] = new ColumnBlockList(up, j, Orientation.col); //for every col in the first row create a colBlockArr
        this.grid[i].push(new Square(i, j, this.rows[i], this.cols[j]));
        this.cols[j].pushSquare(this.grid[i][j]);
        if (i === this.row_number - 1) this.cols[j].setBorder();
      }
      this.rows[i].setBorder();
    }
  }

  goThroghGrid() {
    this.rows.forEach((row) => {
      row.goThroughBlocks();
    });
    this.cols.forEach((col) => {
      col.goThroughBlocks();
    });
  }

  getGrid() {
    return this.grid.map((row) => row.map((square) => square.value));
  }
  isSolved() {
    return this.grid.every((row) =>
      row.every((square) => square.value !== SquareValue.white)
    )
  }
  solve() {
    console.log("solving")
    let i = 0;
    try {
      while (
        i < 100 &&
        !this.isSolved()
      ) {
        i++;
        this.goThroghGrid();
        // console.log("******************************************", i);
      }
    }
    catch (error) {
      console.error(error);
    }
    if (this.isSolved())
      console.log("solved")
    else {
      console.log("not solved")
    }

    return this.getGrid();
  }
}

export default Solver;
