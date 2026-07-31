import { useController, useFormContext } from "react-hook-form";

import ErrorMessage from "./ErrorMessage";
import FieldContext from "./FieldContext";
import HintMessage from "./HintMessage";
import InputLabel from "./InputLabel";

type FormFieldProps = {
    name: string;

    label?: string;

    required?: boolean;

    hint?: string;

    children: React.ReactElement;
};

function FormField({
    name,
    label,
    required = false,
    hint,
    children,
}: FormFieldProps) {
    const { control } = useFormContext();

    const { field, fieldState } = useController({
        name,
        control,
    });

    const error = fieldState.error?.message as string | undefined;

    return (
        <FieldContext.Provider
            value={{
                field,
                fieldState,
            }}
        >
            <div className="flex w-full flex-col py-2">
                {label && <InputLabel label={label} required={required} />}

                {children}

                {hint && !error && <HintMessage hint={hint} />}

                {error && <ErrorMessage error={error} />}
            </div>
        </FieldContext.Provider>
    );
}

export default FormField;
