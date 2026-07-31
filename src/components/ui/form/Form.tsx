import { FormProvider, UseFormReturn } from "react-hook-form";

type FormProps<T extends Record<string, any>> = {
    methods: UseFormReturn<T>;
    onSubmit: (data: T) => void;
    children: React.ReactNode;
};

function Form<T extends Record<string, any>>({
    methods,
    onSubmit,
    children,
}: FormProps<T>) {
    return (
        <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>{children}</form>
        </FormProvider>
    );
}

export default Form;
