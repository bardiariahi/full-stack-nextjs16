import { passwordRules } from "../../dashboard/login/password.rules";

type PasswordRequirementsProps = {
    value: string;
};

function PasswordRequirements({
    value,
}: PasswordRequirementsProps) {
    return (
        <div className="mt-2 flex flex-col gap-1">
            {passwordRules.map((rule) => {
                const isValid = rule.test(value);

                return (
                    <p
                        key={rule.key}
                        className={
                            isValid
                                ? "text-green-600"
                                : "text-gray-500"
                        }
                    >
                        {isValid ? "✓" : "○"} {rule.label}
                    </p>
                );
            })}
        </div>
    );
}

export default PasswordRequirements;