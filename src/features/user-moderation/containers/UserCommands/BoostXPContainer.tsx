import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, Col, InputNumber, Modal, Row } from "antd";

import { boostUserStatsAction } from "../../store";
import { useCurrentStage } from "shared";

interface BoostXPContainerProps {
    groupId: number;
}

export function BoostXPContainer({ groupId }: BoostXPContainerProps) {
    const stage = useCurrentStage();
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [xp, setXp] = useState<number | null>(null);

    const handleOnFinish = () => {
        setIsModalOpen(false);
        dispatch(boostUserStatsAction({ stage, command: { type: "Xp", groupId, value: xp! } }));
        setXp(null);
    };

    const handleOnCancel = () => {
        setXp(null);
        setIsModalOpen(false);
    };

    return (
        <div>
            <div onClick={() => setIsModalOpen(true)}>Boost XP</div>
            <Modal
                destroyOnClose
                title="Boost user XP"
                open={isModalOpen}
                onCancel={handleOnCancel}
                footer={[
                    <Button key="cancel" onClick={handleOnCancel}>
                        Cancel
                    </Button>,
                    <Button disabled={xp === null} type="primary" onClick={handleOnFinish}>
                        Boost
                    </Button>
                ]}>
                <Row gutter={[0, 12]} align="middle">
                    <Col span={24}>Input XP value</Col>
                    <Col>
                        <InputNumber controls={false} style={{ width: "100%" }} value={xp} onChange={(e) => setXp(e)} />
                    </Col>
                </Row>
            </Modal>
        </div>
    );
}
