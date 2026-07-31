type hintMessageProps = {
    hint?: string;
};

const HintMessage = ({ hint }: hintMessageProps) => {
    return <p className="mt-1 text-xs text-gray-500">{hint}</p>;
};

export default HintMessage;
