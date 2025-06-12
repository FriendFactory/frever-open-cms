import React, { useCallback } from "react";
import { Button, Card, Col, Collapse, Form, Row } from "antd";

import { CharacterSpawnPosition } from "features/search-assets/services";
import { LightSettings } from "./LightSettings";
import { useExtraDataBundle } from "shared/hooks/useExtraData";
import { AssetThumbnailContainer } from "features/search-assets/containers/AssetDetails";
import { TagsCard } from "shared";
import { TagsSelect } from "shared/components/TagsSelect";
import { AssetInfoToUpdate } from "features/search-assets/store";
import { SpawnPositionInformation } from "../AssetOrganization/SpawnPositionInformation";

export interface CharacterSpawnPositionProps {
    stage: string;
    loading: boolean;
    data: CharacterSpawnPosition;
    updateCharacterSpawnPositios: (data: AssetInfoToUpdate) => void;
    updateLightSettings: (data: AssetInfoToUpdate) => void;
}

export function CharacterSpawnPosition({
    stage,
    loading,
    data,
    updateCharacterSpawnPositios,
    updateLightSettings
}: CharacterSpawnPositionProps) {
    const extraData = useExtraDataBundle(["BodyAnimationSpaceSize", "SpawnPositionSpaceSize"]);

    const handleOnChangeTags = useCallback(
        (id: number) => (tags: string[]) => updateCharacterSpawnPositios({ id, tags }),
        [data, updateCharacterSpawnPositios]
    );

    return (
        <Collapse
            bordered={false}
            items={[
                {
                    key: data.id,
                    label: `Character Spawn Position "${data.name ?? ""}"`,
                    children: (
                        <Row gutter={24} justify="center">
                            <Col flex="1 1 500px">
                                <Row gutter={[, 24]}>
                                    <Col span={24}>
                                        <Card
                                            title="Information"
                                            extra={
                                                <span>
                                                    ID: <b>{data.id}</b>
                                                </span>
                                            }>
                                            <Form
                                                disabled={loading}
                                                layout="horizontal"
                                                initialValues={data}
                                                onFinish={(values) =>
                                                    updateCharacterSpawnPositios({ id: data.id, ...values })
                                                }>
                                                <SpawnPositionInformation
                                                    bundleData={extraData.bundle}
                                                    unityGuid={data?.unityGuid ?? ""}
                                                    colSize={{ span: 24 }}
                                                />
                                                <Button type="primary" ghost htmlType="submit">
                                                    Save
                                                </Button>
                                            </Form>
                                        </Card>
                                    </Col>
                                    <Col span={24}>
                                        <TagsCard stage={stage} loading={loading && !data}>
                                            <TagsSelect
                                                stage={stage}
                                                value={data.tags}
                                                onChange={handleOnChangeTags(data.id)}
                                            />
                                        </TagsCard>
                                    </Col>
                                </Row>
                            </Col>

                            {data.files && (
                                <Col flex="350px">
                                    <Card>
                                        <Row gutter={[0, 16]}>
                                            {data.files
                                                .filter((el) => el.file === 1)
                                                .map((file) => (
                                                    <Col key={file.resolution} span={24}>
                                                        <AssetThumbnailContainer
                                                            stage={stage}
                                                            id={data.id}
                                                            entityType="CharacterSpawnPosition"
                                                            file={file}
                                                        />
                                                    </Col>
                                                ))}
                                        </Row>
                                    </Card>
                                </Col>
                            )}

                            <Col span={24}>
                                {data.lightSettings.map((lightSetting) => (
                                    <LightSettings
                                        key={lightSetting.id}
                                        loading={loading}
                                        data={lightSetting}
                                        editRequest={updateLightSettings}
                                    />
                                ))}
                            </Col>
                        </Row>
                    )
                }
            ]}
        />
    );
}
