import { useState } from "react";

export function useChangeFormValues() {
    const [values, setValues] = useState<any>({});

    const handleOnValuesChange = (newValues: { [x: string]: string }) => {
        setValues({ ...values, ...newValues });
    };

    const resetValues = () => {
        setValues({});
    };

    return { values, handleOnValuesChange, resetValues };
}
