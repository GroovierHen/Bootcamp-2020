import React, { createContext, useReducer, Dispatch } from "react";

import AppReducer from "./appReducer";
import { State, TransactionActions } from "../types";

// Initial State
const initialState: State = {
  transactions: [],
};

// Create context
export const GlobalContext = createContext<{
  state: State;
  dispatch: Dispatch<TransactionActions>;
}>({ state: initialState, dispatch: () => null });

// Provider component
export const GlobalProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};
