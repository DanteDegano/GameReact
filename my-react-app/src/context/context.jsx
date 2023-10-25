
import React, { useState, createContext } from "react";

export const MyContext = createContext({ valor: 0 });

export default function ContextProvider({ children }) {
  const [valor, setValor] = useState(0);/* Initial value here */

  return (
    <MyContext.Provider value={{ valor, setValor }}>
      {children}
    </MyContext.Provider>
  );
}
