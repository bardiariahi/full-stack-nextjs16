type loginContainerProps = {
    children: React.ReactNode;
};
const LoginContainer = ({ children }: loginContainerProps) => {
    return (
        <div className="w-full h-screen flex flex-col items-center justify-center gap-2">
            {children}
        </div>
    );
};

export default LoginContainer;
