type errorMessageProps = {
    error?: string;
};
const ErrorMessage = ({ error }: errorMessageProps) => {
    return <p className="mt-1 text-xs text-red-500">{error}</p>;
};

export default ErrorMessage;
