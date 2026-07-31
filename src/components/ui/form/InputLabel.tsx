type Props = {
    label: string;
    required?: boolean;
};

const InputLabel = ({ label, required }: Props) => {
    return (
        <label className="mb-2 text-black">
            {label}

            {required && <span className="ml-1 text-red-500">*</span>}
        </label>
    );
};

export default InputLabel;
