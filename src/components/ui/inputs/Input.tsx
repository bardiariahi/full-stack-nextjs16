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

    const wrapperClassName = cn(
        "flex items-center rounded-xl border px-3 py-2 transition-colors",
        hasError
            ? "border-red-500"
            : "border-gray-300 focus-within:border-blue-500",
        disabled && "cursor-not-allowed bg-gray-100",
    );

    return (
        <div className={wrapperClassName}>
            {leftAdornment}

            <input
                {...field}
                id={inputId}
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
                className={cn(
                    "w-full bg-transparent text-black outline-none",
                    "placeholder:text-gray-400",
                    "disabled:cursor-not-allowed",
                    className,
                )}
            />

            {rightAdornment}
        </div>
    );
}

export default Input;
