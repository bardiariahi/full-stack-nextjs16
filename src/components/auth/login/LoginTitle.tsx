type loginTitleProps = {
    title: string;
};
const LoginTitle = ({ title }: loginTitleProps) => {
    return <p className="text-bold text-4xl flex items-center justify-center w-full">{title}</p>;
};

export default LoginTitle;
