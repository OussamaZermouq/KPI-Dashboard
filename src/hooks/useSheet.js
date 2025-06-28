import { useContext } from "react"
import { SheetContext } from "../contexts/SheetContext"

const useSheet = ()=>{
    const context = useContext(SheetContext);
    if (!context){
        throw new Error("useSheet must be used under a SheetContextProvider");
    }
    return context;
}
export default useSheet;