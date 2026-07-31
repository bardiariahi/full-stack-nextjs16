import { cn } from "@/src/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
    variant?: "primary" | "secondary";
    loading?: boolean;
};

function Button({
    children,
    variant = "primary",
    loading = false,
    className,
    disabled,
    ...props
}: ButtonProps) {
    return (
        <button
            {...props}
            disabled={disabled || loading}
            className={cn(
                "btn w-full",
                variant === "primary" && "btn-soft btn-primary",
                variant === "secondary" && "border",
                (disabled || loading) && "cursor-not-allowed opacity-50",
                className,
            )}
        >
            {loading ? "Loading..." : children}
        </button>
    );
}

export default Button;
