import React from 'react';
import './App.css';
import { GameController } from './GameController';

/**
 * App is the root React component.
 */
export const App: React.FC<{}> = () => {
  return (
    <GameController/>
  );
}
