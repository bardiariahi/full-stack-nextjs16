type HintMessageProps = {
    hint: string;
};

function HintMessage({ hint }: HintMessageProps) {
    return <p className="pt-1 text-xs text-gray-500">{hint}</p>;
}

export default HintMessage;
