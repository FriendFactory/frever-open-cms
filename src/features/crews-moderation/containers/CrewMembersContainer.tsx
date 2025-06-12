import React from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { Avatar, Card, List, Space, Tag } from "antd";

import { crewInfoByIdSelector } from "../store/reducer";
import { USER_DETAILS_INFO_URL } from "urls";
import { createCdnURLFromFiles } from "shared";
import { NO_IMAGE_URL } from "config";

export interface CrewMembersContainerProps {
    stage: string;
    id: number;
}

export function CrewMembersContainer({ stage, id }: CrewMembersContainerProps) {
    const { data, loading } = useSelector(crewInfoByIdSelector(stage, id));

    return (
        <Card title="Members" loading={!data && loading} bodyStyle={{ overflowY: "auto", maxHeight: 315 }}>
            <List
                dataSource={data?.members}
                renderItem={(member) => (
                    <List.Item key={member.groupId}>
                        <List.Item.Meta
                            avatar={
                                <Avatar
                                    shape="circle"
                                    size={64}
                                    src={
                                        member.mainCharacterFiles
                                            ? createCdnURLFromFiles({
                                                  id: member.mainCharacterId,
                                                  files: member.mainCharacterFiles,
                                                  stage,
                                                  entityType: "Character",
                                                  resolution: "128x128"
                                              })
                                            : NO_IMAGE_URL
                                    }
                                />
                            }
                            title={
                                <Space direction="vertical" size="small">
                                    <Link
                                        to={USER_DETAILS_INFO_URL.format({
                                            stage,
                                            selector: "mainGroupId",
                                            id: member.groupId
                                        })}>
                                        {member.nickname}
                                    </Link>
                                </Space>
                            }
                            description={
                                <div>
                                    Role: <Tag color="blue">{member.role}</Tag>
                                </div>
                            }
                        />
                    </List.Item>
                )}
            />
        </Card>
    );
}
