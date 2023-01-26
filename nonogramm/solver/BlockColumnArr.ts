import { Orientation } from '../types';
import Block from './Block';
import { block_arr } from './BlockArr';
import Square from './Square';

export class blockColArr extends block_arr {
  constructor(matrix: number[][], index: number, orient: Orientation) {
    super(index, orient);
    let i = matrix.length - 1;
    while (i >= 0 && matrix[i][index]) {
      this.lengths.unshift(matrix[i--][index]);
    }
    this.lengths.map((b) => {
      this.blocks.push(new Block(b, Orientation.col));
    });
  }
  pushSquare(s: Square) {
    this.squares.push(s);
  }
  pushBlockLength(n: number) {
    this.lengths.push(n);
  }
}