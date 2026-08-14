import { useFormField } from "@/src/hooks/useFormField";
import { cn } from "@/src/lib/utils";

type CheckboxProps = {
    label?: string;
    disabled?: boolean;
    className?: string;
};

function Checkbox({
    label,
    disabled,
    className,
}: CheckboxProps) {
    const { field, inputId, hasError } = useFormField({});

    return (
        <label
            htmlFor={inputId}
            className={cn(
                "flex cursor-pointer items-center gap-2",
                disabled && "cursor-not-allowed opacity-50",
                className,
            )}
        >
            <input
                {...field}
                id={inputId}
                type="checkbox"
                className={cn(
                    "checkbox border border-gray-700 text-black",
                    hasError && "checkbox-error",
                )}
                checked={!!field.value}
                disabled={disabled}
                onChange={(e) =>
                    field.onChange(e.target.checked)
                }
            />

            {label && <span>{label}</span>}
        </label>
    );
}

export default Checkbox;
