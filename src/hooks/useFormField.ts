import { useId } from "react";
import { useFieldContext } from "../components/ui/form/FieldContext";

type UseFormFieldProps = {
    id?: string;
};

export function useFormField({ id }: UseFormFieldProps = {}) {
    const { field, fieldState } = useFieldContext();
    const generatedId = useId();
    const inputId = id ?? field.name ?? generatedId;
    const hasError = fieldState.invalid;

    return {
        field,
        fieldState,
        inputId,
        hasError,
    };
}
