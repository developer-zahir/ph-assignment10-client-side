import { createContext, useState } from "react";

export const BillContext = createContext();
export const BillProvider = ({ children }) => {
  const [paidBills, setPaindBills] = useState([]);

  // Bill context value
  const billContextValue = {
    paidBills,
    setPaindBills,
  };

  return (
    // Provide the context value to the children components
    <BillContext.Provider value={billContextValue}>{children}</BillContext.Provider>
  );
};
