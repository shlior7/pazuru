import React, { FunctionComponent,  useState } from "react";
import axios from 'axios'
import { BoardMatrix, InputMatrix } from "./matrix/matrix";
import "./nonogram.css";
import puzzle from './nonograms/Astronaout25X20.json'

type NonogramProps = {
  rows?: number;
  cols?: number;
  save?: (name: string, left: number[][], up: number[][]) => void;
};

export const Nonogram: FunctionComponent<NonogramProps> = ({
}) => {
  //const [name, setName] = useState("");
  const [leftGrid, setleftGrid] = useState(puzzle.left);
  const [upGrid, setUpGrid] = useState(puzzle.up);

  const [grid, setGrid] = useState(Array.from({ length: leftGrid.length }, () => Array.from({ length: upGrid[0].length }, () => 0)))

  //const [okInput, setokInput] = useState(true);
  let okInput = true;
  let name = "";

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
