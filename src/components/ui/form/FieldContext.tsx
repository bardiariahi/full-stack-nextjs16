
import { createContext, useContext } from "react";

import type {
    ControllerFieldState,
    ControllerRenderProps,
    FieldValues,
    Path,
} from "react-hook-form";

export type FieldContextType = {
    field: ControllerRenderProps<FieldValues, string>;
    fieldState: ControllerFieldState;
};

const FieldContext = createContext<FieldContextType | null>(null);

export function useFieldContext<
    T extends FieldValues = FieldValues,
>() {
    const context = useContext(FieldContext);

    if (!context) {
        throw new Error(
            "useFieldContext must be used inside FormField",
        );
    }

    return context as unknown as {
        field: ControllerRenderProps<T, Path<T>>;
        fieldState: ControllerFieldState;
    };
}

export default FieldContext;
