import { createContext, useState } from "react";

export const CityContext = createContext(null);

//Custom Provider for the city context to make sure no re-renders are called

export default function CityContextProvider({ children }) {
  const [selectedCity, setSelectedCity] = useState("");
  const [cities, setCities] = useState([]);

  return (
    <CityContext.Provider
      value={{ selectedCity, setSelectedCity, cities, setCities }}>
      {children}
    </CityContext.Provider>
  );
}
