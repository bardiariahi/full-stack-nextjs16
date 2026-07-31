import { useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaKey, FaUser } from "react-icons/fa6";
import Button from "../../ui/button/Button";
import Form from "../../ui/form/Form";
import FormField from "../../ui/form/FormField";
import Input from "../../ui/inputs/Input";
import LoginTitle from "./LoginTitle";

const LoginForm = () => {
    const methods = useForm({
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const [feildType, setFeildType] = useState("password");

    const showAndHidePassword = (e: any) => {
        e.preventDefault();
        if (feildType == "password") {
            setFeildType("text");
        } else {
            setFeildType("password");
        }
    };

    const passwordIcon = (
        <button>
            <FaKey size={22} />
        </button>
    );

    const userIcon = (
        <button>
            <FaUser size={22} />
        </button>
    );

    const passwordBtn = (
        <button onClick={showAndHidePassword}>
            <FaEye size={22} />
        </button>
    );

    return (
        <div>
            <LoginTitle title="Dashboard Login" />
            <Form
                methods={methods}
                onSubmit={(data) => {
                    console.log(data);
                }}
            >
                <FormField name="email" label="Email">
                    <Input
                        placeholder="Email"
                        type="email"
                        leftAdornment={userIcon}
                    />
                </FormField>
                <FormField name="password" label="password">
                    <Input
                        placeholder="password"
                        type={feildType}
                        leftAdornment={passwordIcon}
                        rightAdornment={passwordBtn}
                    />
                </FormField>
                <Button>login</Button>
            </Form>
        </div>
    );
};

export default LoginForm;
