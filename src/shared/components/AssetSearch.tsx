import React, { useCallback, useMemo } from "react";
import { Avatar, Badge, message, Table, Tag } from "antd";
import dayjs from "dayjs";
import { ColumnsType } from "antd/lib/table";

import { createCdnURLFromFiles, ProtectedLink, readinessColor } from "shared";
import { AssetData, AssetDataNames } from "features/search-assets/services";
import { useExtraData } from "shared/hooks/useExtraData";
import { DETAILS_ASSET_URL, EXTERNAL_SONG_DETAILS_URL } from "urls";

export interface AssetSearchProps<T extends AssetDataNames = AssetDataNames, K extends AssetData = AssetData> {
    stage: string;
    data: K[T][];
    assetType: T;
    loading: boolean;
    responseError?: string;
    extraColumns?: ColumnsType<K[T]>;
    renderActionComponent?: (asset: K[T]) => JSX.Element;
}

export function AssetSearch({
    stage,
    assetType,
    data,
    responseError,
    loading,
    extraColumns,
    renderActionComponent
}: AssetSearchProps) {
    if (responseError) {
        message.error(`${responseError} Asset list can't be displayed.`);
    }

    const readinessList = useExtraData({ stage, name: "Readiness" });

    const getRowKey = useCallback((enity: AssetData[AssetDataNames]) => enity.id, []);

    const columns = useMemo(() => {
        const result: ColumnsType<AssetData[AssetDataNames]> = [
            {
                title: "ID",
                dataIndex: "id",
                width: 115
            },
            {
                title: "Name",
                width: 160,
                render: (_: unknown, asset: AssetData[AssetDataNames]) =>
                    assetType === "CharacterSpawnPosition" && "setLocation" in asset ? (
                        <p>
                            {asset.name + " ("}
                            <ProtectedLink
                                feature="AssetFull"
                                to={DETAILS_ASSET_URL.format({
                                    stage,
                                    asset: "SetLocation",
                                    id: asset?.setLocation?.id as any
                                })}>
                                {asset.setLocation?.name}
                            </ProtectedLink>
                            {")"}
                        </p>
                    ) : "songName" in asset ? (
                        <ProtectedLink
                            feature="AssetFull"
                            to={EXTERNAL_SONG_DETAILS_URL.format({ stage, id: asset.id })}>
                            {asset.songName}
                        </ProtectedLink>
                    ) : assetType !== "CharacterSpawnPosition" && assetType !== "ExternalSong" ? (
                        <ProtectedLink
                            feature="AssetFull"
                            to={DETAILS_ASSET_URL.format({ stage, asset: assetType, id: asset.id })}>
                            {"displayName" in asset ? asset.displayName : (asset as any).name ?? ""}
                        </ProtectedLink>
                    ) : (
                        ""
                    )
            }
        ];

        if (assetType !== "ExternalSong") {
            result.push({
                width: 120,
                title: "Thumbnail",
                render: (_: unknown, asset: AssetData[AssetDataNames]) =>
                    "files" in asset && (
                        <Avatar
                            shape="square"
                            size={80}
                            src={createCdnURLFromFiles({
                                id: asset.id,
                                files: asset.files,
                                stage,
                                entityType: assetType,
                                resolution: "128x128"
                            })}
                        />
                    )
            });
        }

        if (assetType !== "ExternalSong" && assetType !== "CameraAnimationTemplate") {
            result.push(
                {
                    width: 160,
                    title: "Created Time",
                    render: (_: unknown, asset: AssetData[AssetDataNames]) =>
                        "createdTime" in asset && dayjs.utc(asset.createdTime).format("DD MMM YYYY HH:mm:ss")
                },

                {
                    width: 160,
                    title: "Modified Time",
                    render: (_: unknown, asset: AssetData[AssetDataNames]) =>
                        "modifiedTime" in asset && dayjs.utc(asset.modifiedTime).format("DD MMM YYYY HH:mm:ss")
                }
            );
        }

        if (assetType === "ExternalSong") {
            result.push({
                title: "Status",
                width: 160,
                render: (_: unknown, asset: AssetData[AssetDataNames]) =>
                    "isDeleted" in asset && asset.isDeleted ? (
                        <Badge color="red" text="Deleted" />
                    ) : (
                        <Badge color="blue" text="Active" />
                    )
            });
        }

        if (assetType !== "ExternalSong" && assetType !== "CharacterSpawnPosition") {
            result.push({
                title: "Readiness",
                width: 160,
                render: (_: unknown, asset: AssetData[AssetDataNames]) =>
                    "readinessId" in asset && (
                        <Tag color={readinessColor[asset.readinessId]}>
                            {readinessList.data?.find((el) => el.id === asset.readinessId)?.name ?? "Unknown"}
                        </Tag>
                    )
            });
        }

        if (extraColumns) result.push(...extraColumns);

        if (!!renderActionComponent)
            result.push({
                width: 65,
                title: "Action",
                align: "right",
                render: (_: unknown, asset: AssetData[AssetDataNames]) =>
                    renderActionComponent && renderActionComponent(asset)
            });

        return result;
    }, [assetType, renderActionComponent]);

    return (
        <Table
            loading={loading}
            dataSource={data}
            columns={columns}
            rowKey={getRowKey}
            scroll={{ x: 600 }}
            pagination={false}
        />
    );
}
