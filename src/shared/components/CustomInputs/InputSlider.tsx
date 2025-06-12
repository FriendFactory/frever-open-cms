import React from "react";
import { InputNumber, Slider, SliderSingleProps, Space } from "antd";

export interface InputSliderProps extends SliderSingleProps {
    onChange?: (value: number | null) => void;
}

export const InputSlider = ({ min, max, step, value, onChange, ...props }: InputSliderProps) => {
    return (
        <Space.Compact block>
            <Slider
                style={{ width: "100%", marginLeft: 11, marginRight: 15 }}
                value={value}
                min={min}
                max={max}
                onChange={onChange}
                step={step as number}
                {...props}
            />

            <InputNumber
                min={min}
                max={max}
                step={step as number}
                value={value}
                disabled={props.disabled}
                onChange={onChange}
            />
        </Space.Compact>
    );
};
