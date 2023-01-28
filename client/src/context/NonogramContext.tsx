import React, { createContext, useContext, useState } from 'react';

type NonogramContextProps = {
  leftGrid: number[][],
  setLeftGrid: React.Dispatch<React.SetStateAction<number[][]>>,
  upGrid: number[][],
  setUpGrid: React.Dispatch<React.SetStateAction<number[][]>>,
  won: boolean,
  setWon: React.Dispatch<React.SetStateAction<boolean>>
};


const NonogramContext = createContext<NonogramContextProps>({ leftGrid: [], setLeftGrid: () => {},
                                                          upGrid: [], setUpGrid: () => {},
                                                          won: false, setWon: () => {} });

type NonogramProviderProps = {
  children: React.ReactElement
};

export const NonogramProvider = ({ children }: NonogramProviderProps) => {
  let [ leftGrid, setLeftGrid ] = useState<number[][]>([]);
  let [ upGrid, setUpGrid ] = useState<number[][]>([]);
  let [ won, setWon ] = useState<boolean>(false);

  return (
    <NonogramContext.Provider value={
      {
        leftGrid, setLeftGrid,
        upGrid, setUpGrid,
        won, setWon
      }
    }>
      {children}
    </NonogramContext.Provider>
  );
};

export const useNonogramContext = (): NonogramContextProps => useContext(NonogramContext);

// Usage
// const { numberSelected, setNumberSelected } = useNumberValue();
