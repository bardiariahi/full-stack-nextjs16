export const passwordRules = [
    {
        key: "minLength",
        label: "At least 8 characters",
        test: (value: string) => value.length >= 8,
    },
    {
        key: "uppercase",
        label: "One uppercase letter",
        test: (value: string) => /[A-Z]/.test(value),
    },
    {
        key: "lowercase",
        label: "One lowercase letter",
        test: (value: string) => /[a-z]/.test(value),
    },
    {
        key: "number",
        label: "One number",
        test: (value: string) => /\d/.test(value),
    },
    {
        key: "symbol",
        label: "One symbol",
        test: (value: string) =>
            /[^A-Za-z\d]/.test(value),
    },
];