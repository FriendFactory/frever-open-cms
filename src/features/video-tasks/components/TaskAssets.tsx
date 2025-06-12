import React, { useCallback } from "react";
import { Avatar, Badge, Flex, Table, Tag } from "antd";

import { Task } from "../services";
import { DETAILS_ASSET_URL, EXTERNAL_SONG_DETAILS_URL } from "urls";
import { TaskAssetWithEntity } from "../store/reducer/taskDetails.reducer";
import { createCdnURLFromFiles, ProtectedLink, readinessColor } from "shared";
import { useExtraData } from "shared/hooks/useExtraData";
import { TaskAssetAction } from "../containers/TaskAssetAction";
import { ReadinessTag } from "shared/components/ReadinessTag";

export type TaskAssetEntity = NonNullable<Task["assets"]>[number];

export interface TaskAssetsProps {
    stage: string;
    data?: TaskAssetWithEntity[];
}

export function TaskAssets({ stage, data }: TaskAssetsProps) {
    const readinessList = useExtraData({ stage, name: "Readiness" });

    const getRowKey = useCallback((data: TaskAssetWithEntity) => `${data.info.assetId}/${data.info.assetType}`, [data]);

    const columns = [
        {
            title: "ID",
            width: "120px",
            render: (_: unknown, asset: TaskAssetWithEntity) => {
                if (asset.info.assetType === "ExternalSong") {
                    return (
                        <ProtectedLink
                            feature="AssetFull"
                            to={EXTERNAL_SONG_DETAILS_URL.format({
                                stage,
                                id: asset.info.assetId
                            })}>
                            {asset.info.assetId}
                        </ProtectedLink>
                    );
                }

                if (asset.info.assetType === "CharacterSpawnPosition") {
                    return (
                        <ProtectedLink
                            feature="AssetFull"
                            to={DETAILS_ASSET_URL.format({
                                stage,
                                asset: asset.info.assetType,
                                id: asset.info.assetId
                            })}>
                            {asset.info.assetId}
                        </ProtectedLink>
                    );
                }

                return (
                    <ProtectedLink
                        feature="AssetFull"
                        to={DETAILS_ASSET_URL.format({
                            stage,
                            asset: asset.info.assetType,
                            id: asset.info.assetId
                        })}>
                        {asset.info.assetId}
                    </ProtectedLink>
                );
            }
        },
        {
            title: "Asset Type",
            width: "120px",
            render: (_: unknown, asset: TaskAssetWithEntity) => asset.info.assetType
        },
        {
            title: "Name",
            width: "160px",
            render: (_: unknown, asset: TaskAssetWithEntity) => {
                if (asset.entity && "name" in asset.entity && "setLocation" in asset.entity) {
                    return (
                        <p>
                            {asset.entity.name + " ("}
                            <ProtectedLink
                                feature="AssetFull"
                                to={DETAILS_ASSET_URL.format({
                                    stage,
                                    asset: "SetLocation",
                                    id: (asset.entity.setLocation as any).id
                                })}>
                                {(asset.entity.setLocation as any).name}
                            </ProtectedLink>
                            {")"}
                        </p>
                    );
                }

                if (asset.entity) {
                    return "songName" in asset?.entity
                        ? asset.entity?.songName
                        : "displayName" in asset?.entity
                        ? asset.entity.displayName
                        : asset.entity.name;
                }
                return "";
            }
        },
        {
            title: "Thumbnail",
            width: "100px",
            render: (_: unknown, asset: TaskAssetWithEntity) =>
                asset.entity &&
                "files" in asset.entity && (
                    <Avatar
                        shape="square"
                        size={80}
                        src={
                            asset.entity?.files
                                ? createCdnURLFromFiles({
                                      id: asset.entity?.id,
                                      files: asset.entity?.files,
                                      stage,
                                      entityType: asset.info.assetType,
                                      resolution: "128x128"
                                  })
                                : ""
                        }
                    />
                )
        },
        {
            title: "",
            width: "160px",
            render: (_: unknown, asset: TaskAssetWithEntity) => {
                const readinessId = asset?.entity && "readinessId" in asset?.entity ? asset.entity.readinessId : null;

                const setLocationReadinessId =
                    asset?.entity && "setLocation" in asset?.entity ? asset.entity.setLocation?.readinessId : null;
                const isExcludedFromLists =
                    asset?.entity && "setLocation" in asset.entity && asset.entity.setLocation?.isExcludedFromLists;

                if (readinessId) {
                    return (
                        <Tag color={readinessId ? readinessColor[readinessId] : undefined}>
                            {readinessList.data?.find((el) => el.id === readinessId)?.name ?? "Unknown"}
                        </Tag>
                    );
                }
                if (setLocationReadinessId) {
                    return (
                        <Flex vertical align="start" gap="small">
                            <ReadinessTag stage={stage} readinessId={setLocationReadinessId} />

                            {isExcludedFromLists && <Tag color={"red"}>Excluded From Lists</Tag>}
                        </Flex>
                    );
                }
                if (asset.entity && "isDeleted" in asset.entity) {
                    return asset.entity.isDeleted ? (
                        <Badge color="red" text="Deleted" />
                    ) : (
                        <Badge color="blue" text="Active" />
                    );
                }
                return "";
            }
        },
        {
            title: "",
            width: "80px",
            render: (entity: TaskAssetWithEntity) => <TaskAssetAction value={entity} />
        }
    ];

    return <Table rowKey={getRowKey} pagination={false} dataSource={data} columns={columns} scroll={{ x: 460 }} />;
}
