import React, { createContext, useState, useContext } from 'react';

const StatsContext = createContext();
export const useStats = () => useContext(StatsContext);

export const StatsProvider = ({ children }) => {
  const [wins, setWins] = useState(0);
  const [losses, setLosses] = useState(0);

  return (
    <StatsContext.Provider value={{ wins, setWins, losses, setLosses }}>
      {children}
    </StatsContext.Provider>
  );
};

