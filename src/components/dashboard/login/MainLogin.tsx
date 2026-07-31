"use client";
import { useState } from "react";
import LoginContainer from "./LoginContainer";
import LoginForm from "./LoginForm";
import SignupForm from "./SignupForm";
import SignupLogin from "./SignupLogin";

const MainLogin = () => {
    const [isSignup, setIsSignup] = useState(false);

    return (
        <LoginContainer>
            <div className="w-1/4">
                {isSignup ? <SignupForm /> : <LoginForm />}
                {/* <SignupLogin state={isSignup} setState={setIsSignup} /> */}
            </div>
        </LoginContainer>
    );
};

export default MainLogin;
