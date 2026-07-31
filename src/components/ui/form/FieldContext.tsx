import { 
    createContext,
    useContext
} from "react";

import {
    ControllerFieldState,
    ControllerRenderProps,
} from "react-hook-form";


type FieldContextType = {
    field: ControllerRenderProps<any>;
    fieldState: ControllerFieldState;
};


const FieldContext =
    createContext<FieldContextType | null>(null);



export function useFieldContext(){

    const context =
        useContext(FieldContext);


    if(!context){
        throw new Error(
            "useFieldContext must be used inside FormField"
        );
    }


    return context;
}


export default FieldContext;