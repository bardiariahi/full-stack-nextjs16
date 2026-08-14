type InputLabelProps = {
    label: string;
    required?: boolean;
    inputId: string;
};

function InputLabel({
    label,
    required = false,
    inputId,
}: InputLabelProps) {
    return (
        <label
            htmlFor={inputId}
            className="pb-2 text-black"
        >
            {label}

            {required && (
                <span className="ml-1 text-red-500">
                    *
                </span>
            )}
        </label>
    );
}

export default InputLabel;