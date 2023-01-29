import React, { useEffect, useState } from 'react';

type HeaderProps = {
  onClick: () => void,
  game?:string
};

/**
 * React component for the Header Section.
 */
export const Header = (props: HeaderProps) => {


  const kakuro =()=>{
    return (
      <h1>
        Ka<span className="header__group-one">ku</span><span className="header__group-two">ro</span>
      </h1>
  )
  }

  const nonogram =()=>{
    return (
      <h1>
        No<span className="header__group-one">no</span><span className="header__group-two">gram</span>
      </h1>
  )
  }

  const sudoku= ()=>{
    return (
        <h1>
          Su<span className="header__group-one">do</span><span className="header__group-two">ku</span>
        </h1>
    )
  }
  const [title,setTitle] = useState(sudoku());
  useEffect(()=>{

    switch(props.game){
      case 'nonogram':
        setTitle( nonogram())
        break;
      case 'sudoku':
        setTitle( sudoku())
        break;
    case 'kakuro':
        setTitle(kakuro())
        break;
    }
  },[props.game]);
  

  return (
      <header className="header">
        {title}
        <h2 onClick={props.onClick}>
          New Game
        </h2>
      </header>
    )
}

