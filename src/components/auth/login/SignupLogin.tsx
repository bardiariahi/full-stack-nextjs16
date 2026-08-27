type SignupOrLoginProps = {
    state: boolean;
    setState: any;
};

const SignupLogin = ({ state, setState }: SignupOrLoginProps) => {
    const handleChange = () => {
        setState((prev: any) => !prev);
    };
    return (
        <div className="flex items-center justify-center w-full py-2">
            <button
                className="cursor-pointer text-blue-600"
                onClick={handleChange}
            >
                {state ? "Login Page ?" : "SignUp Page?"}
            </button>
        </div>
    );
};

export default SignupLogin;
