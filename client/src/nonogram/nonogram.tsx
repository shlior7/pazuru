import React, { FunctionComponent,  useState } from "react";
import axios from 'axios'
import { BoardMatrix, InputMatrix } from "./matrix/matrix";
import "./nonogram.css";
type NonogramProps = {
  rows?: number;
  cols?: number;
  save?: (name: string, left: number[][], up: number[][]) => void;
};

export const Nonogram: FunctionComponent<NonogramProps> = ({
}) => {
  //const [name, setName] = useState("");
  const [leftGrid, setleftGrid] = useState([
    [0, 0, 1, 1, 1, 1],
    [0, 0, 2, 2, 2, 2],
    [2, 2, 1, 1, 2, 2],
    [0, 0, 4, 1, 1, 4],
    [0, 0, 0, 0, 4, 4],
    [0, 0, 0, 0, 2, 5],
    [0, 0, 0, 0, 0, 6],
    [0, 0, 0, 1, 1, 4],
    [0, 0, 0, 0, 0, 10],
    [0, 0, 0, 0, 0, 12],
    [0, 0, 0, 0, 7, 6],
    [0, 0, 0, 1, 2, 6],
    [0, 0, 0, 0, 4, 6],
    [0, 0, 0, 0, 3, 6],
    [0, 0, 0, 0, 0, 6],
  ]);
  const [upGrid, setUpGrid] = useState([
    [0, 0, 2, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0],
    [0, 3, 2, 6, 5, 1, 2, 2, 2, 0, 0, 5, 2, 3, 3],
    [3, 3, 2, 6, 7, 3, 6, 3, 5, 11, 14, 8, 7, 6, 5],
  ]);

  const [grid, setGrid] = useState(Array.from({ length: leftGrid.length }, () => Array.from({ length: upGrid[0].length }, () => 0)))

  //const [okInput, setokInput] = useState(true);
  let okInput = true;
  let name = "";
  /* if (leftGrid.length !== rows) {
    console.log("rerender rows");
    setleftGrid(
      Array.from({ length: rows }, () => Array.from({ length: 5 }, () => 0))
    );
  }
  if (upGrid[0].length !== cols) {
    console.log("rerender cols");
    setUpGrid(
      Array.from({ length: 6 }, () => Array.from({ length: cols }, () => 0))
    );
  }*/
  console.log(okInput);
  // let solveGrid: MainGrid = new MainGrid(leftGrid, upGrid);

  const solveGrid = async () => {
    const response = await axios.post('http://localhost:8001/solve',{left:leftGrid,up:upGrid})
    console.log(response.data)
    setGrid(response.data)
  };

  return (
    <div className="grid-container">
      <div className="left">
        <InputMatrix
          getGrid={(matrix: number[][]) => setleftGrid(matrix)}
          grid={leftGrid}
          maxValue={upGrid[0].length}
          isOkay={(ok) => (okInput = ok)}
        ></InputMatrix>
      </div>
      <div className="up">
        <InputMatrix
          getGrid={(matrix: number[][]) => setUpGrid(matrix)}
          grid={upGrid}
          maxValue={leftGrid.length}
          isOkay={(ok) => (okInput = ok)}
        ></InputMatrix>
      </div>
      <div className="main">
        <BoardMatrix
          grid={grid}
          setValue={(i, j, value) => (grid[i][j] = value)}
        ></BoardMatrix>
      </div>
      <div className="buttons">
        <button className="submit_button" onClick={solveGrid}>
          Solve
        </button>
      </div>
    </div>
  );
};
