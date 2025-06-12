import React from "react";
import dayjs from "dayjs";
import { Avatar, Badge, Tag, Tooltip } from "antd";
import { ColumnType } from "antd/lib/table";

import { DETAILS_ASSET_URL, EXTERNAL_SONG_DETAILS_URL } from "urls";
import { createCdnURLFromFiles, ProtectedLink } from "shared";
import { AssetData, CharacterSpawnPosition } from "features/search-assets/services";
import { ReadinessTag } from "./ReadinessTag";

export type BaseAssetDataNames = keyof Pick<
    AssetData,
    | "BodyAnimation"
    | "CameraAnimationTemplate"
    | "CameraFilter"
    | "CharacterSpawnPosition"
    | "SFX"
    | "SetLocation"
    | "Song"
    | "VFX"
    | "VoiceFilter"
    | "Wardrobe"
>;

export const createAssetBaseColumns = <T extends BaseAssetDataNames = BaseAssetDataNames>(
    stage: string,
    assetType: T
): ColumnType<AssetData[T]>[] => [
    {
        title: "ID",
        dataIndex: "id",
        width: 115
    },
    {
        title: "Name",
        dataIndex: "name",
        width: 160,
        render: (_, asset) => (
            <ProtectedLink
                target="_blank"
                feature="AssetFull"
                to={DETAILS_ASSET_URL.format({ stage, asset: assetType, id: asset.id })}>
                {"displayName" in asset ? asset.displayName : asset.name ?? ""}
            </ProtectedLink>
        )
    },
    {
        title: "Thumbnail",
        width: 120,
        render: (_, asset) =>
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
    },
    {
        title: "Created Time",
        dataIndex: "createdTime",
        width: 160,
        render: (_, asset) => "createdTime" in asset && dayjs.utc(asset.createdTime).format("DD MMM YYYY HH:mm:ss")
    },
    {
        title: "Modified Time",
        dataIndex: "modifiedTime",
        width: 160,
        render: (_, asset) => "modifiedTime" in asset && dayjs.utc(asset.modifiedTime).format("DD MMM YYYY HH:mm:ss")
    },
    {
        title: "Readiness",
        dataIndex: "readinessId",
        width: 160,
        render: (_, asset) => "readinessId" in asset && <ReadinessTag stage={stage} readinessId={asset.readinessId} />
    }
];

export const createExternalSongColumns = (stage: string): ColumnType<AssetData["ExternalSong"]>[] => [
    {
        title: "ID",
        dataIndex: "id",
        width: 115
    },
    {
        title: "Name",
        key: "name",
        width: 160,
        render: (_, asset) => (
            <ProtectedLink
                target="_blank"
                feature="AssetFull"
                to={EXTERNAL_SONG_DETAILS_URL.format({ stage, id: asset.id })}>
                {asset.songName}
            </ProtectedLink>
        )
    },
    {
        title: "Status",
        width: 160,
        render: (_, asset) =>
            "isDeleted" in asset && asset.isDeleted ? (
                <Badge color="red" text="Deleted" />
            ) : (
                <Badge color="blue" text="Active" />
            )
    }
];

export const createSpawnPositionColumns = (stage: string) => {
    const columns = createAssetBaseColumns(stage, "CharacterSpawnPosition").reduce<
        ColumnType<CharacterSpawnPosition>[]
    >((acc, column) => {
        acc.push(
            column.dataIndex === "id"
                ? {
                      title: "ID",
                      dataIndex: "id",
                      width: 115,
                      render: (_, asset) => (
                          <ProtectedLink
                              target="_blank"
                              feature="AssetFull"
                              to={DETAILS_ASSET_URL.format({ stage, asset: "CharacterSpawnPosition", id: asset.id })}>
                              {asset.id}
                          </ProtectedLink>
                      )
                  }
                : column.dataIndex === "name"
                ? {
                      title: "Name",
                      width: 160,
                      render: (_: unknown, asset: CharacterSpawnPosition) =>
                          asset.setLocation ? (
                              <p>
                                  {asset.name + " ("}
                                  <Tooltip placement="topLeft" title="Set Location">
                                      <ProtectedLink
                                          target="_blank"
                                          feature="AssetFull"
                                          to={DETAILS_ASSET_URL.format({
                                              stage,
                                              asset: "SetLocation",
                                              id: asset?.setLocation?.id as any
                                          })}>
                                          {asset.setLocation?.name}
                                      </ProtectedLink>
                                  </Tooltip>
                                  {")"}
                              </p>
                          ) : (
                              asset.name
                          )
                  }
                : column.dataIndex === "readinessId"
                ? {
                      title: "Readiness",
                      width: 160,
                      render: (_: unknown, asset) =>
                          asset.setLocation && (
                              <ReadinessTag stage={stage} readinessId={asset.setLocation.readinessId} />
                          )
                  }
                : column
        );

        return acc;
    }, []);

    columns.push({
        title: "Excluded From Lists",
        width: 100,
        render: (_: unknown, asset) =>
            asset.setLocation && (
                <Tag color={asset.setLocation.isExcludedFromLists ? "red" : "blue"}>
                    {asset.setLocation.isExcludedFromLists ? "Yes" : "No"}
                </Tag>
            )
    });

    return columns;
};

export const createCameraAnimationTemplateColumns = (stage: string) =>
    createAssetBaseColumns(stage, "CameraAnimationTemplate").filter(
        (column) => column.dataIndex !== "createdTime" && column.dataIndex !== "modifiedTime"
    );

export const assetColumnsCreators = {
    BodyAnimation: (stage: string) => createAssetBaseColumns(stage, "BodyAnimation"),
    VFX: (stage: string) => createAssetBaseColumns(stage, "VFX"),
    Song: (stage: string) => createAssetBaseColumns(stage, "Song"),
    VoiceFilter: (stage: string) => createAssetBaseColumns(stage, "VoiceFilter"),
    Wardrobe: (stage: string) => createAssetBaseColumns(stage, "Wardrobe"),
    SFX: (stage: string) => createAssetBaseColumns(stage, "SFX"),
    SetLocation: (stage: string) => createAssetBaseColumns(stage, "SetLocation"),
    CameraFilter: (stage: string) => createAssetBaseColumns(stage, "CameraFilter"),
    ExternalSong: createExternalSongColumns,
    CameraAnimationTemplate: createCameraAnimationTemplateColumns,
    CharacterSpawnPosition: createSpawnPositionColumns
};
