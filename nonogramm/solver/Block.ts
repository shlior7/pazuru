import { Orientation, SquareValue } from "../types";
import Square from "./Square";
import SubBlock from "./SubBlock";

export class Block {
  logical_length: number;
  offset: number;
  block: Square[];
  left_border: number;
  right_border: number;
  orient: Orientation;
  XAround: number[];
  mySubBlock: SubBlock;
  constructor(logical_length: number, orient: Orientation) {
    this.logical_length = logical_length;
    this.left_border = 0;
    this.right_border = this.logical_length;
    this.block = [];
    this.orient = orient;
    this.offset = 0;
    this.XAround = [];
    this.mySubBlock = new SubBlock(this.orient);
  }
  get ph_length() {
    return this.block.length;
  }
  set squareBlock(squares: Square[]) {
    this.block = squares;
    if (this.block.length) {
      this.orient === Orientation.row
        ? (this.offset = squares[0].col)
        : (this.offset = squares[0].row);
    }
  }

  getPossibleRight() {
    return (
      this.mySubBlock.GetActualStartAndEnd().start + this.logical_length - 1
    );
  }

  getPossibleLeft() {
    return this.mySubBlock.GetActualStartAndEnd().end - this.logical_length + 1;
  }

  deleteFromBlock(start: number, end: number) {
    for (let i = start - this.offset; i <= end - this.offset; i++) {
      if (i >= 0 && i < this.block.length) {
        if (
          this.block[i].myBlocks.length === 0 &&
          this.block[i].value === SquareValue.white
        ) {
          this.block[i].X();
        }
        this.block[i].myBlocks.splice(
          this.block[i].myBlocks.findIndex(
            (block) =>
              block.logical_length === this.logical_length &&
              block.offset === this.offset &&
              block.orient === this.orient
          ),
          1
        );
      }
    }
  }

  ///gets a index and the subBlock and finds the block of squares of the same squareType around it
  findBlockAround(index: number, subBlock: SubBlock, squareValue: SquareValue) {
    subBlock.push(this.block[index]);
    function blackBlockLeft(leftIndex: number, block: Square[]) {
      //console.log("i_LeftIndex: " + i_LeftIndex);
      if (leftIndex < 0 || block[leftIndex].value !== squareValue) return;
      subBlock.unshift(block[leftIndex]);
      // console.log(t_block.length, t_block.block[0], t_block);
      blackBlockLeft(leftIndex - 1, block);
    }
    function blackBlockRight(rightIndex: number, block: Square[]): number {
      // console.log("i_RightIndex: " + i_RightIndex);
      if (
        rightIndex >= block.length ||
        block[rightIndex].value !== squareValue
      )
        return rightIndex - 1;
      subBlock.push(block[rightIndex]);
      // console.log(t_block.length, t_block.block[t_block.length - 1], t_block);
      return blackBlockRight(rightIndex + 1, block);
    }
    blackBlockLeft(index - 1, this.block);
    blackBlockRight(index + 1, this.block);
  }


  colorAroundSubBlock(subBlock: SubBlock) {
    let ActualBlock = subBlock.GetActualStartAndEnd();
    let start = ActualBlock.start - 1;
    let end = ActualBlock.end + 1;

    if (subBlock.length > this.logical_length) return end - this.offset;

    function ColorLeft(FromIndex: number, To: number, Block: Block) {
      if (FromIndex + Block.offset >= To) return true;
      ////console.log(FromIndex, "fromIndex");
      if (Block.block[FromIndex].value === SquareValue.X) return false;
      Block.block[FromIndex].color(SquareValue.black);
      subBlock.push(Block.block[FromIndex]);
      if (!ColorLeft(FromIndex + 1, To, Block)) {
        Block.block[FromIndex].color(SquareValue.white);
        subBlock.pop();
        return false;
      }
      return true;
    }
    function ColorRight(FromIndex: number, To: number, Block: Block) {
      if (FromIndex + Block.offset <= To) return true;
      ////console.log(FromIndex, "fromIndex");
      if (Block.block[FromIndex].value === SquareValue.X) return false;
      Block.block[FromIndex].color(SquareValue.black);
      subBlock.push(Block.block[FromIndex]);
      if (!ColorLeft(FromIndex - 1, To, Block)) {
        Block.block[FromIndex].color(SquareValue.white);
        subBlock.pop();
        return false;
      }
      return true;
    }
    ColorLeft(end - this.offset, this.left_border + this.logical_length, this);
    ColorRight(
      start - this.offset,
      this.right_border - this.logical_length,
      this
    );

    ActualBlock = subBlock.GetActualStartAndEnd();
    start = ActualBlock.start;
    end = ActualBlock.end;
    this.fillBlockWithX(start, end);
    return end - this.offset;
  }

  colorAroundSubBlock2(subBlock: SubBlock) {
    let ActualBlock = subBlock.GetActualStartAndEnd();
    let start = ActualBlock.start - 1;
    let end = ActualBlock.end + 1;

    if (subBlock.length > this.logical_length) return end - this.offset;

    function ColorLeft(from: number, To: number, Block: Block) {
      while (from + Block.offset < To) {
        if (Block.block[from].value === SquareValue.X) return false;
        Block.block[from].color(SquareValue.black);
        subBlock.push(Block.block[from]);
        from++;
      }
      return true;
    }
    function ColorRight(from: number, To: number, Block: Block) {
      while (from + Block.offset > To) {
        if (Block.block[from].value === SquareValue.X) return false;
        Block.block[from].black();
        subBlock.push(Block.block[from]);
        from--;
      }
      return true;
    }
    ColorLeft(end - this.offset, this.left_border + this.logical_length, this);
    ColorRight(
      start - this.offset,
      this.right_border - this.logical_length,
      this
    );

    ActualBlock = subBlock.GetActualStartAndEnd();
    this.fillBlockWithX(ActualBlock.start, ActualBlock.end);

    return end - this.offset;
  }

  fillBlockWithX(start: number, end: number) {
    let i;
    //if Block is Done
    if (end - start + 1 === this.logical_length) {
      // console.log("Yesssss");
      // console.log(start, end, this.block, this.left_border, this.right_border);
      this.XAround = [start - 1, end + 1];
    }
    for (i = this.left_border; i <= this.right_border; i++) {
      let i_inBlock = i - this.offset;

      if (i <= end - this.logical_length || i >= start + this.logical_length) {
        if (this.block[i_inBlock].IsLoyalSquare(this.orient)) {
          this.block[i_inBlock].X();
        }
      }
    }
  }

  SetBorderAroundSubBlock() {
    if (!this.mySubBlock || this.mySubBlock.length === 0) return;

    const start = this.mySubBlock.GetActualStartAndEnd().start;
    const end = this.mySubBlock.GetActualStartAndEnd().end;

    this.deleteFromBlock(this.left_border, end - this.logical_length);
    this.deleteFromBlock(start + this.logical_length, this.right_border);
    this.right_border = start + this.logical_length - 1;
    this.left_border = end - this.logical_length + 1;
    this.squareBlock = this.block.slice(
      this.left_border - this.offset,
      this.right_border - this.offset + 1
    );
  }

  SetNewBorders(left: number, right: number) {
    this.deleteFromBlock(this.left_border, left - 1);
    this.deleteFromBlock(right + 1, this.right_border);
    this.squareBlock = this.block.slice(
      left - this.offset,
      right - this.offset + 1
    );
    this.right_border = right;
    this.left_border = left;
  }

  gothroughBlock() {
    // let black_block: subBlock = new subBlock(0, this.orient);
    let i = 0;

    while (i < this.block.length) {
      let current_square = this.block[i];
      if (current_square.value === SquareValue.black) {
        let black_block: SubBlock = new SubBlock(this.orient);
        this.findBlockAround(i, black_block, SquareValue.black);
        if (black_block.IsSquaresLoyal()) {
          i = this.colorAroundSubBlock2(black_block);
          this.mySubBlock = black_block;
        } else {
          if (black_block.length > this.logical_length) {
            this.deleteFromBlock(
              black_block.GetActualStartAndEnd().start,
              black_block.GetActualStartAndEnd().end
            );
          }
        }
      }
      i++;
    }

    for (let i = this.right_border - this.logical_length - this.offset + 1; i < this.left_border + this.logical_length - this.offset; i++) {
      this.block[i] && this.block[i].black();
    }


  }
}

export default Block;
