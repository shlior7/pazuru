import React, { FunctionComponent } from "react";
import "./grid.css";

type GridProps = {
  grid: number[][];
};

export const NumbersGrid: FunctionComponent<GridProps> = ({
  grid,
}) => {
  return (
    <table>
      <tbody>
        {grid.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => (
              <td
                key={j}
                onClick={() => {
                  
                }}
              >
                {cell === 0 ? "" : cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
