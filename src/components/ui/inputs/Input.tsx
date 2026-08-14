import { useFormField } from "@/src/hooks/useFormField";
import { cn } from "@/src/lib/utils";

type InputProps = {
    id?: string;

    type?: React.HTMLInputTypeAttribute;
    placeholder?: string;

    disabled?: boolean;
    readOnly?: boolean;

    autoFocus?: boolean;
    autoComplete?: string;

    maxLength?: number;
    minLength?: number;

    className?: string;

    leftAdornment?: React.ReactNode;
    rightAdornment?: React.ReactNode;

    dir?: "rtl" | "ltr";
};

function Input({
    id,

    type = "text",
    placeholder,

    disabled,
    readOnly,

    autoFocus,
    autoComplete = "off",

    maxLength,
    minLength,

    className,

    leftAdornment,
    rightAdornment,

    dir,
}: InputProps) {
    const { field, inputId, hasError } = useFormField({
        id,
    });

    return (
        <div
            className={cn(
                "flex items-center rounded-xl border px-3 py-2 transition",

                hasError ? "border-red-500" : "border-gray-300",

                disabled && "cursor-not-allowed bg-gray-100",
            )}
        >
            {leftAdornment}

            <input
                {...field}
                id={inputId}
                className={cn(
                    "w-full bg-transparent px-2 text-black outline-none",
                    disabled && "cursor-not-allowed",
                    className,
                )}
                type={type}
                placeholder={placeholder}
                disabled={disabled}
                readOnly={readOnly}
                autoFocus={autoFocus}
                autoComplete={autoComplete}
                maxLength={maxLength}
                minLength={minLength}
                dir={dir}
                aria-invalid={hasError}
            />

            {rightAdornment}
        </div>
    );
}

export default Input;
