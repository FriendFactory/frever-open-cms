import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Button, Col, Row } from "antd";
import { PlusOutlined } from "@ant-design/icons";

import { ColdStartList } from "../components/ColdStartList";
import { GetVideoListParams, VideoPatchRequest } from "../services";
import { patchVideoCommandAction, videoModerationListPageSelector } from "../store";
import { AddVideoToColdStartContainer } from "./AddVideoToColdStartContainer";

export interface ColdStartListContainerProps {
    stage: string;
    params: GetVideoListParams;
}

export function ColdStartListContainer({ stage, params }: ColdStartListContainerProps) {
    const dispatch = useDispatch();

    const info = useSelector(videoModerationListPageSelector(stage, params));

    const handleOnSetStartListItem = (videoId: number, data: VideoPatchRequest) =>
        dispatch(patchVideoCommandAction({ stage, videoId, data }));

    return (
        <Row justify="end">
            <Col flex="0 0 32px">
                <AddVideoToColdStartContainer button={<Button type="primary" ghost icon={<PlusOutlined />} />} />
            </Col>
            <Col span={24}>
                <ColdStartList
                    data={info.data.orderBy((el) => el.startListItem)}
                    loading={info.loading}
                    onSetStartListItem={handleOnSetStartListItem}
                />
            </Col>
        </Row>
    );
}
