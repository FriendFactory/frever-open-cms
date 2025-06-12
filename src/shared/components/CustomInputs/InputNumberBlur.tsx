import React, { useState } from "react";
import { InputNumber, InputNumberProps } from "antd";

interface InputNumberBlurProps extends InputNumberProps {
    onChangeOrder: (order: InputNumberProps["value"]) => void;
}

export const InputNumberBlur = ({ onChangeOrder, ...props }: InputNumberBlurProps) => {
    const [value, setValue] = useState(props.value);

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
        if (e.target.value === "") return;

        const validateRange =
            e.target.value > props.max! ? props.max : e.target.value < props.min! ? props.min : e.target.value;

        onChangeOrder(validateRange);
    };
    return (
        <InputNumber
            {...props}
            type="number"
            onBlur={handleBlur}
            value={value}
            onChange={(newValue) => setValue((prevVal) => (newValue === null ? prevVal : newValue))}
        />
    );
};
