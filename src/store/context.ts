import React, { createContext } from "react";
import type { Action } from "./reducer.ts";

export const DispatchContext = createContext<React.Dispatch<Action>>(() => {
  throw new Error("DispatchContext value={dispatch} is missing");
});
