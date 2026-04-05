import { useCallback, useState } from "react";

type ValidationResult<T> = {
    isValid: boolean;
    errors: Partial<Record<keyof T, string>>
};

type ValidationFuntion<T> = (value: T) => ValidationResult<T>;

type UseFormDataProps<T> = {
    initialValues: T;
    validate?: ValidationFuntion<T>;
}

export function useFormData<T extends Record<string, any>>({
    initialValues,
    validate = () => ({ isValid: true, errors: {} })
}: UseFormDataProps<T>) {
    const [value, setValues] = useState<T>(initialValues);
    const [errors, setError] = useState<Partial<Record<keyof T, string>>>({})
    const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

    //change any field
    const handlechanges = useCallback(
        (name: keyof T, value: T[keyof T]) => {
            setValues(prev => ({ ...prev, [name]: value }));
            setError(prev => ({
                ...prev,
                [name]: '',
            }))
        }, []
    );

    const runValidation = useCallback((): ValidationResult<T> => {
        const result = validate(value);
        setError(result?.errors ?? {});
        return result;
    },[value,validate]);

    // submit form
    const handleSubmit = useCallback(
        async (onSubmit:(values : T) => Promise<void> | void): Promise<boolean> => {
            setIsSubmitting(true);

            const {isValid,errors: validationError} =  validate(value);
            if(!isValid){
                setError(validationError)
                setIsSubmitting(false)
                return false
            }

            await onSubmit(value);
            setIsSubmitting(false);

            return true;
        },
        [value,validate]
    );

    const resetForm = useCallback(()=>{
        setValues(initialValues);
        setError({});
    },[initialValues]);

    return {
        value,
        errors,
        isSubmitting,
        handleSubmit,
        handlechanges,
        resetForm,
        runValidation,
        setValues
    }
}
