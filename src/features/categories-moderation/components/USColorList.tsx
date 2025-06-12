import React from "react";
import { Button, Col, Row } from "antd";
import { ArrowLeftOutlined, ArrowRightOutlined } from "@ant-design/icons";
import styled from "styled-components";

import { ColorPickerModal } from "features/categories-moderation/containers/UmaSharedColor/ColorPickerModal";
import { RgbaColor } from "utils";
import { Gutter } from "antd/es/grid/row";

const gutter: [Gutter, Gutter] = [40, 40];

export interface USColorListProps {
    colorList: RgbaColor[];
    changeOrder: (currentIndex: number, direction: "left" | "right") => void;
}

export function USColorList({ colorList, changeOrder }: USColorListProps) {
    return (
        <Row gutter={gutter}>
            {colorList?.map((color, index) => (
                <Col key={index}>
                    <ColorCircleStyled
                        style={{
                            backgroundColor: `rgba(${color.red},${color.green},${color.blue},${color.alpha})`
                        }}>
                        <ArrowsRowStyled justify="space-between">
                            <Col span={12}>
                                <Button disabled={index === 0} type="link" onClick={() => changeOrder(index, "left")}>
                                    <ArrowLeftOutlined />
                                </Button>
                            </Col>
                            <Col span={12}>
                                <Button
                                    disabled={index === colorList.length - 1}
                                    type="link"
                                    onClick={() => changeOrder(index, "right")}>
                                    <ArrowRightOutlined />
                                </Button>
                            </Col>
                        </ArrowsRowStyled>
                    </ColorCircleStyled>
                </Col>
            ))}
            <Col>
                <ColorCircleStyled>
                    <ColorPickerModal />
                </ColorCircleStyled>
            </Col>
        </Row>
    );
}

const ColorCircleStyled = styled.div`
    width: 100px;
    height: 100px;
    border-radius: 50%;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;

    display: flex;
    align-items: center;
    justify-content: center;
`;

const ArrowsRowStyled = styled(Row)`
    opacity: 0;
    box-shadow: 0 3px 10px rgb(0 0 0 / 20%);
    background: rgba(255, 255, 255, 0.2);
    border-radius: 20px;
    &:hover {
        opacity: 1;
    }
`;
