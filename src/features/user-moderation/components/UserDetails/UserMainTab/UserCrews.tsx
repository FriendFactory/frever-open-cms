import React from "react";
import { Card, Col, Empty, Row, Space, Tag } from "antd";
import { Crew } from "features/crews-moderation/services";

import { CrewListThumbnail } from "features/crews-moderation/containers/CrewListThumbnailContainer";
import { ProtectedLink } from "shared";
import { CREW_DETAILS_PAGE_URL } from "urls";

export interface UserCrewsProps {
    stage: string;
    data: Crew[];
    loading: boolean;
}

export const UserCrews = ({ stage, data, loading }: UserCrewsProps) => {
    return (
        <Card title="Crews" loading={loading}>
            {data.length ? (
                <Row gutter={24} style={{ overflowY: "auto", maxHeight: 300 }}>
                    {data?.map((item) => (
                        <Col key={item.id} lg={24} xl={12} xxl={8}>
                            <Card bordered={false} bodyStyle={{ paddingLeft: 0 }} style={{ boxShadow: "none" }}>
                                <Card.Meta
                                    title={
                                        <ProtectedLink
                                            to={CREW_DETAILS_PAGE_URL.format({
                                                stage,
                                                id: item.id
                                            })}
                                            feature="Social">
                                            {item.name}
                                        </ProtectedLink>
                                    }
                                    avatar={
                                        <CrewListThumbnail
                                            stage={stage}
                                            id={item.id}
                                            version={item.files[0].version}
                                            size={100}
                                        />
                                    }
                                    description={
                                        <div>
                                            <div>ID: {item.id}</div>
                                            <div>
                                                Status:{" "}
                                                <Space size="small">
                                                    <Tag
                                                        color={item.isPublic ? "blue" : "warning"}
                                                        style={{ margin: 0 }}>
                                                        {item.isPublic ? "Public" : "Private"}
                                                    </Tag>
                                                    <Tag color={item.isDeleted ? "red" : "blue"} style={{ margin: 0 }}>
                                                        {item.isDeleted ? "Deleted" : "Active"}
                                                    </Tag>
                                                </Space>
                                            </div>
                                        </div>
                                    }
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            ) : (
                <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} style={{ margin: 0 }} />
            )}
        </Card>
    );
};
