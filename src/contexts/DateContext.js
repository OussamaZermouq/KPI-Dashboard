import { createContext, useState } from "react";

export const DateContext = createContext(null);

export default function DateContextProvider({ children }) {
  const [selectedDate, setSelectedDate] = useState();
  const [dates, setDates] = useState([]);

  return (
    <DateContext.Provider
      value={{
        selectedDate,
        setSelectedDate,
        dates,
        setDates,
      }}
    >
      {children}
    </DateContext.Provider>
  );
}
