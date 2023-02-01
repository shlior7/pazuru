import React from 'react';
import { Sudoku } from './Sudoku';
import { SudokuProvider } from './context/SudokuContext';
import { Nonogram } from './nonogram/nonogram';
import './App.css';
import { NonogramProvider } from './context/NonogramContext';
import { Nonograms } from './Nonograms';
import {KakuroBoard} from './Kakuro';

/**
 * App is the root React component.
 */
const getGame = (game: string) => {
  switch(game){
    case 'sudoku':
      return <SudokuProvider>
           <Sudoku />
         </SudokuProvider>
    case 'kakuro':
      return <KakuroBoard />
    case 'nonogram':
      return <NonogramProvider>
          <Nonograms />
        </NonogramProvider>
  }
}         

export const GameController: React.FC<{}> = () => {
  const [game, setGame] = React.useState("sudoku");
  return (
    <div>
      <select value= {game} onChange={(e)=>setGame(e.target.value)}>
        <option value="sudoku">sudoku</option>
        <option value="kakuro">kakuro</option>
        <option value="nonogram">nonogram</option>
      </select>
      {getGame(game)}
      </div>
  );
}
