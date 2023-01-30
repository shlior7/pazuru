import React, { useState} from 'react';
import "./kakuro.css";

  const KakuroBoard: React.FC<{}> = (props) => {
    const [grid, setGrid] = useState([
      [
        -1,
        -1,
        -1,
        -1,
        4,
        0,
        10,
        0,
        -1,
        -1,
        -1,
        -1,
        -1,
        -1
      ],
      [
        -1,
        -1,
        0,
        4,
        0,
        0,
        0,
        0,
        -1,
        -1,
        3,
        0,
        4,
        0
      ],
      [
        -1,
        -1,
        0,
        3,
        0,
        0,
        0,
        0,
        11,
        4,
        0,
        0,
        0,
        0
      ],
      [
        -1,
        -1,
        3,
        0,
        4,
        10,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0
      ],
      [
        0,
        11,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        0,
        4,
        0,
        -1,
        -1
      ],
      [
        0,
        4,
        0,
        0,
        0,
        0,
        0,
        4,
        0,
        0,
        0,
        0,
        -1,
        -1
      ],
      [
        -1,
        -1,
        -1,
        -1,
        -1,
        -1,
        0,
        3,
        0,
        0,
        0,
        0,
        -1,
        -1
      ]
    ]
    );
    function createKakuroRow(row:number[]){
       return row.reduce((accumulator, currentValue,currentIndex, array) => {
        if (currentIndex % 2 === 0) {
          if(currentValue === -1 && array[currentIndex+1] === -1){
            accumulator.push(<td key={currentIndex} className="disabled">-</td>);
          }
          else if(currentValue === 0 && array[currentIndex+1] === 0){
            accumulator.push(<td key={currentIndex} className="number">-</td>);
          }
          else if(currentValue > 0 && array[currentIndex+1] > 0){
            accumulator.push(<td key={currentIndex} className="number_filled">-</td>);
          }
          else{
            accumulator.push(<td className="sum">
                <div className="topNumber"></div>
                <div className="bottomNumber">17</div>
              </td>
              )
          }
        }
        return accumulator;
       },[] as JSX.Element[])

    }
    
    return (
      <table className="kakuro-board">
        <tbody>
          {grid.map((row, i) => (
            <tr key={i}>
              {createKakuroRow(row).map((cell) => {return cell})}
            </tr>
          ))}
        </tbody>
      </table>
    );
  };
  

export default KakuroBoard;
