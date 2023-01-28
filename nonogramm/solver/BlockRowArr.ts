import { Orientation } from "../types";
import Block from "./Block";
import { BlockList } from "./BlockList";
import Square from "./Square";

export class RowBlockList extends BlockList {
  constructor(
    index: number,
    row: Square[],
    orient: Orientation,
    matrix: number[][]
  ) {
    super(index, orient);
    this.squares = row;
    this.lengths = matrix[index].filter((n) => n !== 0);
    this.lengths.map((b) => {
      this.blocks.push(new Block(b, Orientation.row));
    });
  }
  // append(index: number, s: Square) {
  //   let i = 0;
  //   while (this.blocks[index].block[i].col < s.col) i++;
  //   this.blocks[index].block.splice(i, 0, s);
  //   s.black();
  // }
}
