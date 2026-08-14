type ErrorMessageProps = {
    error: string;
};

function ErrorMessage({ error }: ErrorMessageProps) {
    return <p className="pt-1 text-xs text-red-500">{error}</p>;
}

export default ErrorMessage;
