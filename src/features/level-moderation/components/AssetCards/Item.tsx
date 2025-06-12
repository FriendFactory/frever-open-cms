import React from "react";
import { Col, Divider, Row } from "antd";

const Item = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
    const thumbnail = React.Children.map(children, (child) => (child.type.displayName === "Thumbnail" ? child : null));
    const text = React.Children.map(children, (child) => (child.type.displayName === "Text" ? child : null));

    return (
        <div>
            <Row gutter={[24, 24]} justify="space-between">
                <Col flex="0 0 160px">{thumbnail}</Col>
                <Col flex="1 0 260px">
                    <Row gutter={[24, 24]} align="middle">
                        {text}
                    </Row>
                </Col>
            </Row>
            <Divider />
        </div>
    );
};

const Thumbnail = ({ children }: { children: JSX.Element }) => children;
Thumbnail.displayName = "Thumbnail";
Item.Thumbnail = Thumbnail;

const Text = ({ children, label }: { children: React.ReactNode; label: React.ReactNode }) => (
    <Col flex="280px">
        {label}:&nbsp;{children}
    </Col>
);

Text.displayName = "Text";
Item.Text = Text;

export { Item };
