import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaKey, FaUser } from "react-icons/fa6";

import Button from "../../ui/button/Button";
import Form from "../../ui/form/Form";
import FormField from "../../ui/form/FormField";
import Checkbox from "../../ui/inputs/Checkbox";
import Input from "../../ui/inputs/Input";
import PasswordRequirements from "../../ui/inputs/PasswordRequirements";

import LoginTitle from "./LoginTitle";
import { loginSchema, type LoginFormValues } from "./login.schema";

const LoginForm = () => {
    const methods = useForm<LoginFormValues>({
        resolver: zodResolver(loginSchema),

        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });

    const [fieldType, setFieldType] =
        useState<React.HTMLInputTypeAttribute>("password");

    const showAndHidePassword = () => {
        setFieldType((prev) => (prev === "password" ? "text" : "password"));
    };

    const password = methods.watch("password");

    const passwordIcon = (
        <span aria-hidden="true">
            <FaKey size={22} />
        </span>
    );

    const userIcon = (
        <span aria-hidden="true">
            <FaUser size={22} />
        </span>
    );

    const passwordBtn = (
        <button
            type="button"
            onClick={showAndHidePassword}
            aria-label={
                fieldType === "password" ? "Show password" : "Hide password"
            }
        >
            <FaEye size={22} />
        </button>
    );

    const handleSubmit = (data: LoginFormValues) => {
        console.log(data);
    };

    return (
        <div>
            <LoginTitle title="Dashboard Login" />

            <Form methods={methods} onSubmit={handleSubmit}>
                <FormField<LoginFormValues> name="email" label="Email" required>
                    <Input
                        placeholder="Email"
                        type="email"
                        leftAdornment={userIcon}
                        autoComplete="email"
                    />
                </FormField>

                <FormField<LoginFormValues>
                    name="password"
                    label="Password"
                    required
                >
                    <Input
                        placeholder="Password"
                        type={fieldType}
                        leftAdornment={passwordIcon}
                        rightAdornment={passwordBtn}
                        autoComplete="current-password"
                    />

                    <PasswordRequirements value={password} />
                </FormField>

                <FormField<LoginFormValues> name="rememberMe">
                    <Checkbox label="Remember me" />
                </FormField>

                <Button type="submit">Login</Button>
            </Form>
        </div>
    );
};

export default LoginForm;
