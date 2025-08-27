import { createContext, useState, useEffect } from "react";

export const GlobalContext = createContext();

export const GlobalContextProvider = ({ children }) => {

  const [logoAnimation, setLogoAnimation] = useState(true);

  return (
    <GlobalContext.Provider value={{logoAnimation, setLogoAnimation}} >
      {children}
    </GlobalContext.Provider>
  );
};