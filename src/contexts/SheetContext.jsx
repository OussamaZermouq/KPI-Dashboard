import { createContext, useState } from "react";

export const SheetContext = createContext(null);

export default function SheetContextProvider({ children }) {
  const [selectedSheet, setSelectedSheet] = useState("");
  const [sheets, setSheets] = useState([]);

  return (
    <SheetContext.Provider
      value={{selectedSheet, setSelectedSheet, sheets, setSheets}}>
      {children}
    </SheetContext.Provider>
  );
}
