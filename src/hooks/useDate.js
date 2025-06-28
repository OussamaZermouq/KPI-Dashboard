import { useContext } from "react"
import { SheetContext } from "../contexts/SheetContext"
import { DateContext } from "../contexts/DateContext.jsx";

const useDate = ()=>{
    const context = useContext(DateContext);
    if (!context){
        throw new Error("useDate must be used under a DateContextProvider");
    }
    return context;
}
export default useDate;