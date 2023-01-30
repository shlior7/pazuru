import Square from "./Square";
import Block from "./Block";
import SubBlock from "./SubBlock";
import { Orientation, SquareValue } from "../types";

export class BlockList {
  index: number;
  lengths: number[];
  blocks: Block[];
  squares: Square[];
  orient: Orientation;
  constructor(index: number, orient: Orientation) {
    this.index = index;
    this.lengths = [];
    this.blocks = [];
    this.squares = [];
    this.orient = orient;
  }
  jumpOverXLeft(i: number, blLeft: Block, index: number) {
    let k = i;
    let XBlock = new SubBlock(blLeft.orient);
    while (
      k < this.squares.length - 1 &&
      this.squares[k].value === SquareValue.white
    ) {
      k++;
    }
    //console.log(k, blLeft, i);
    if (
      k - i < blLeft.logical_length &&
      this.squares[k].value === SquareValue.X
    ) {
      blLeft.findBlockAround(k - blLeft.offset, XBlock, SquareValue.X);
      let actual = XBlock.GetActualStartAndEnd();
      i = actual.end + 1;

      //blLeft.deleteBlock(blLeft.left_border, actual.end);

      //console.log(k, XBlock, actual, i);
    }
    let newLeft = i;
    if (index > 0) {
      newLeft = Math.max(
        i,
        this.blocks[index - 1].left_border +
        this.blocks[index - 1].logical_length +
        1,
        this.blocks[index - 1].mySubBlock.GetActualStartAndEnd().end + 1
      );
    }
    blLeft.deleteFromBlock(blLeft.left_border, newLeft - 1);
    return newLeft;
  }
  jumpOverXRight(i: number, blRight: Block, index: number) {
    let f = i;
    let XBlock = new SubBlock(blRight.orient);
    while (f > 0 && this.squares[f].value === SquareValue.white) {
      f--;
    }
    if (
      i - f < blRight.logical_length &&
      this.squares[f].value === SquareValue.X
    ) {
      blRight.findBlockAround(f - blRight.offset, XBlock, SquareValue.X);
      let actual = XBlock.GetActualStartAndEnd();
      //console.log(f, XBlock, actual, i);
      i = actual.start - 1;
      // blRight.deleteBlock(actual.start, blRight.right_border);
    }
    let newRight = i;
    if (index < this.blocks.length - 1) {
      newRight = Math.min(
        i,
        this.blocks[index + 1].right_border -
        this.blocks[index + 1].logical_length -
        1,
        this.blocks[index + 1].mySubBlock.GetActualStartAndEnd().start - 1
      );
    }
    blRight.deleteFromBlock(newRight + 1, blRight.right_border);
    //console.log(" ");
    return newRight;
  }

  DeleteBlocks(block: Block, index: number) {
    let Finished = false;
    block.XAround.forEach((i) => {
      Finished = true;
      if (this.squares[i]) {
        this.squares[i].X();
        //console.log(block, this.squares[i], "XXXXXXX");
      }
    });

    if (Finished) {
      if (
        this.blocks[index - 1] &&
        this.blocks[index - 1].right_border > block.XAround[0]
      ) {
        this.blocks[index - 1].right_border = block.XAround[0];
      }

      if (
        this.blocks[index + 1] &&
        this.blocks[index + 1].left_border <
        block.XAround[block.XAround.length - 1]
      ) {
        this.blocks[index + 1].left_border =
          block.XAround[block.XAround.length - 1];
      }
      block.deleteFromBlock(block.left_border, block.right_border);
      this.blocks.splice(index, 1);
    }
    if (this.blocks.length === 0) {
      //console.log("fuckkk yeesss");
      this.squares.forEach((s) => {
        if (s.value === SquareValue.white) s.X();
      });
    }
  }

  changeBorder() {
    this.blocks.forEach((blLeft, index) => {
      let blRight = this.blocks[this.blocks.length - 1 - index];

      let i = blLeft.left_border;
      let j = blRight.right_border;

      let k = this.jumpOverXLeft(i, blLeft, index);
      let f = this.jumpOverXRight(j, blRight, this.blocks.length - 1 - index);

      blLeft.left_border = k;
      blRight.right_border = f;
    });

    this.blocks.forEach((bl) => {
      bl.SetNewBorders(bl.left_border, bl.right_border);
    });
  }

  setBorder() {
    let i = 0;
    let j = this.squares.length - 1;
    this.blocks.forEach((blLeft, index) => {
      let blRight = this.blocks[this.blocks.length - 1 - index];
      blLeft.left_border = i; //including
      blRight.right_border = j;
      i += blLeft.logical_length + 1;
      j -= blRight.logical_length + 1;
      //console.log("b", i, j, bl);
    });

    this.blocks.forEach((bl) => {
      bl.squareBlock = this.squares.slice(bl.left_border, bl.right_border + 1);
      bl.block.forEach((square) => {
        square.myBlocks.push(bl);
      });
    });
  }

  goThroughBlocks() {
    this.blocks.forEach((block, index) => {
      block.gothroughBlock();
      this.DeleteBlocks(block, index);
    });
    this.changeBorder();
  }
}

