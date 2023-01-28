import React from 'react';
import { Difficulty } from '../Difficulty';
import { Numbers } from '../Numbers';
import { Action } from '../Action';


type StatusSectionProps = {
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  onClickNumber: (number: string) => void,
  onClickUndo: () => void,
  onClickErase: () => void,
  onClickHint: () => void,
  onClickMistakesMode: () => void,
  onClickFastMode: () => void,
  onSolve?: () => void,
};

/**
 * React component for the Status Section.
 */
export const StatusSection = (props: StatusSectionProps) => {
  return (
    <section className="status">
      <Difficulty onChange={props.onChange} />
      <div className="status__actions">
        <Action action='undo' onClickAction={props.onClickUndo} />
        <Action action='erase' onClickAction={props.onClickErase} />
        <Action action='hint' onClickAction={props.onClickHint} />
      <button style={{width:"100px",height:"30px",marginTop:"10px",marginLeft:"50px"}} onClick={props.onSolve}> Solve </button>
      </div>
    </section>
  )
}
