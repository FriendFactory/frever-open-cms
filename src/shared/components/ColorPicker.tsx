import React, { useState, useRef } from "react";
import { Slider, Card, Row, Col, InputNumber, Button } from "antd";
import styled from "styled-components";

import { HsbColor, hsvTorgb, RgbaColor, RgbColor, rgbTohsv } from "utils";

export interface ColorPickerProps {
    defaultColor?: RgbColor;
    onSubmit: (color: RgbaColor) => void;
}

export function ColorPicker({ defaultColor, onSubmit }: ColorPickerProps) {
    const sbArea = useRef<HTMLDivElement>(null);

    const [draggind, setDragging] = useState(false);
    const [alpha, setAlpha] = useState<number>(1);
    const [hsb, setHsb] = useState<HsbColor>({ hue: 240, saturation: 100, brightness: 100 });
    const [rgbColor, setRgbColor] = useState<RgbColor>(defaultColor ?? hsvTorgb(hsb));

    const handleMouseMove = (mouseEvent: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        const rect = sbArea?.current?.getBoundingClientRect();
        if (draggind && rect) {
            const percentPositionX = (Math.floor(mouseEvent.clientX - rect.left) / rect.width) * 100;
            const percentPositionY = 100 - (Math.floor(mouseEvent.clientY - rect.top) / rect.height) * 100;

            const newSaturation = percentPositionX > 100 ? 100 : percentPositionX < 0 ? 0 : percentPositionX;
            const newBrightness = percentPositionY > 100 ? 100 : percentPositionY < 0 ? 0 : percentPositionY;

            const newHsb = { hue: hsb.hue, saturation: newSaturation, brightness: newBrightness };

            setHsb(newHsb);
            setRgbColor(hsvTorgb(newHsb));
        }
    };

    const handleChangeHue = (value: number) => {
        const newHsb = { ...hsb, hue: value };

        setHsb(newHsb);
        setRgbColor(hsvTorgb(newHsb));
    };

    const handleChangeRgbColor = (color: keyof RgbColor) => (value: number | null) => {
        const newRgbColor = { ...rgbColor, [color]: value };

        setHsb(rgbTohsv(newRgbColor));
        setRgbColor(newRgbColor);
    };

    const handleOnSubmit = () => onSubmit({ ...rgbColor, alpha });

    return (
        <ColorPickerWrapper
            className="ColorPicker"
            onMouseMove={(event) => handleMouseMove(event)}
            onMouseUp={() => setDragging(false)}>
            <Card bordered={false}>
                <div className="card">
                    <Row gutter={12}>
                        <Col xs={14}>
                            <div className="sb-block">
                                <div
                                    className="sb-pointer"
                                    style={{
                                        left: hsb.saturation + "%",
                                        bottom: hsb.brightness + "%",
                                        background: `rgba(${rgbColor.red}, ${rgbColor.green}, ${rgbColor.blue},${alpha})`
                                    }}
                                    onMouseDown={() => setDragging(true)}
                                />
                                <div
                                    ref={sbArea}
                                    className="sb-area"
                                    style={{
                                        background: `linear-gradient(transparent 0%, rgb(0, 0, 0) 100%),
                                         linear-gradient(to right, rgb(255, 255, 255) 0%, rgba(255, 255, 255, 0) 100%),
                                          hsl(${hsb.hue}, 100%, 50%, 1)`
                                    }}
                                    onMouseDown={() => setDragging(true)}
                                />
                            </div>
                        </Col>
                        <Col xs={10}>
                            <div
                                id="current-color"
                                className="current-color"
                                style={{
                                    background: `rgba(${rgbColor.red}, ${rgbColor.green}, ${rgbColor.blue},${alpha})`
                                }}
                            />
                        </Col>

                        <Col span={24}>
                            <h3>Hue</h3>
                            <Slider className="hue-slider" value={hsb.hue} onChange={handleChangeHue} max={359} />
                        </Col>
                        <Col span={24}>
                            <h3>Alpha</h3>
                            <Slider
                                min={0}
                                max={1}
                                step={0.01}
                                value={alpha}
                                onChange={(value) => setAlpha(value ?? 0)}
                            />
                        </Col>
                        <Col span={24}>
                            <Row gutter={10}>
                                <Col>
                                    <h4>Red</h4>
                                    <InputNumber
                                        min={0}
                                        max={255}
                                        value={rgbColor.red}
                                        onChange={handleChangeRgbColor("red")}
                                    />
                                </Col>
                                <Col>
                                    <h4>Green</h4>
                                    <InputNumber
                                        min={0}
                                        max={255}
                                        value={rgbColor.green}
                                        onChange={handleChangeRgbColor("green")}
                                    />
                                </Col>
                                <Col>
                                    <h4>Blue</h4>
                                    <InputNumber
                                        min={0}
                                        max={255}
                                        value={rgbColor.blue}
                                        onChange={handleChangeRgbColor("blue")}
                                    />
                                </Col>
                                <Col>
                                    <h4>Alpha</h4>
                                    <InputNumber
                                        min={0}
                                        max={1}
                                        step={0.01}
                                        value={alpha}
                                        onChange={(value) => setAlpha(value ?? 0)}
                                    />
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </div>
            </Card>

            <div className="submit-block">
                <Button type="primary" onClick={handleOnSubmit}>
                    Submit
                </Button>
            </div>
        </ColorPickerWrapper>
    );
}

const ColorPickerWrapper = styled.div`
    display: flex;
    flex-direction: column;

    -webkit-user-select: none; /* Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+/Edge */
    user-select: none; /* Standard */

    .sb-block {
        position: relative;
        margin-bottom: 16px;
    }

    .sb-pointer {
        position: absolute;
        border-radius: 50%;
        border: 2px solid white;
        outline: 1px solid black;
        height: 20px;
        width: 20px;
        margin: -10px;
    }

    .sb-area {
        height: 200px;
        width: 100%;
    }

    .current-color {
        height: 200px;
        width: 100%;
    }

    .hue-slider {
        background: linear-gradient(
            to right,
            hsl(0, 100%, 50%),
            hsl(60, 100%, 50%),
            hsl(120, 100%, 50%),
            hsl(180, 100%, 50%),
            hsl(240, 100%, 50%),
            hsl(300, 100%, 50%),
            hsl(360, 100%, 50%)
        );

        & .ant-slider-rail {
            display: none;
        }

        & .ant-slider-track {
            display: none;
        }

        & .ant-slider-handle {
            background-color: none;
        }
    }

    .ant-slider-handle::after {
        background: none;
        box-shadow: none;

        border: 2px solid white;
        outline: 1px solid black;
    }

    .submit-block {
        padding: 24px;
        align-self: flex-end;
    }
`;
