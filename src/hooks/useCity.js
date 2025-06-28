import { CityContext } from "../contexts/CityContext";
import { useContext } from "react";

const useCity = () => {
  const context = useContext(CityContext);
  if (!context) {
    throw new Error("useCity must be used under a CityContextProvider");
  }
  return context;
};

export default useCity;
