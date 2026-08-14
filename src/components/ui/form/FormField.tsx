import { useId } from "react";

import {
    useController,
    useFormContext,
} from "react-hook-form";

import type {
    FieldValues,
    Path,
} from "react-hook-form";

import ErrorMessage from "./ErrorMessage";
import FieldContext from "./FieldContext";
import HintMessage from "./HintMessage";
import InputLabel from "./InputLabel";

type FormFieldProps<T extends FieldValues> = {
    name: Path<T>;
    label?: string;
    required?: boolean;
    hint?: string;
    children: React.ReactNode;
};

function FormField<T extends FieldValues>({
    name,
    label,
    required = false,
    hint,
    children,
}: FormFieldProps<T>) {
    const id = useId();

    const { control } = useFormContext<T>();

    const { field, fieldState } = useController({
        name,
        control,
    });

    const error = fieldState.error?.message;

    return (
        <FieldContext.Provider
            value={{
                field: field as never,
                fieldState,
            }}
        >
            <div className="flex w-full flex-col py-2">
                {label && (
                    <InputLabel
                        label={label}
                        required={required}
                        inputId={id}
                    />
                )}

                {children}

                {hint && !error && (
                    <HintMessage hint={hint} />
                )}

                {error && (
                    <ErrorMessage error={error} />
                )}
            </div>
        </FieldContext.Provider>
    );
}

export default FormField;