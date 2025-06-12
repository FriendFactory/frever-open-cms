import React from "react";
import { Row, Typography } from "antd";
import dayjs from "dayjs";

import { PageHeader } from "shared/components/PageHeader";
import { Character } from "features/user-moderation/services";

const { Text, Title } = Typography;

export interface CharacterHeaderProps {
    id: number;
    character?: Character;
}

export function CharacterHeader({ id, character }: CharacterHeaderProps) {
    return (
        <PageHeader
            withBackButton
            title={`Character ${id}`}
            extra={
                character?.isDeleted && (
                    <Title level={3} type="danger">
                        Deleted
                    </Title>
                )
            }>
            {character && (
                <Row justify="space-between">
                    <Text type="secondary">
                        Created Time: {dayjs.utc(character?.createdTime).format("DD MMM YYYY HH:mm:ss")}
                    </Text>

                    <Text type="secondary">
                        Modified Time: {dayjs.utc(character?.modifiedTime).format("DD MMM YYYY HH:mm:ss")}
                    </Text>
                </Row>
            )}
        </PageHeader>
    );
}
