import React from "react";
import { Badge, Button, Space, message, Tag } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { MoreOutlined } from "@ant-design/icons";

import { PromotedSong, PromotedSongListQueryParams, PromotedSongType } from "../services";
import { promotedSongListPageSelector } from "../store/reducer/promotedSongListPageReducer";
import { ThumbnailCard } from "shared/components/ThumbnailCard";
import { createCdnURLFromFiles, useExtraDataBundle } from "shared";
import { AppState } from "app-state";
import { createPromotedSongNameKey } from "../store/reducer/songNamesReducer";
import { promotedSongPostAction } from "../store/actions";
import { EditableTableV2, EditableTableV2Column } from "shared/components/EditableTableV2/EditableTableV2";
import { SelectSongDropdownContainer } from "./SelectSongDropdownContainer";
import { validatePromotedSongImage } from "../helpers";
import { ChangePromotedSongStatus } from "../components/ChangePromotedSongStatus";
import { SongLink } from "../components/SongName";
import { PromotedSongFormContainer } from "./PromotedSongFormContainer";

export interface PromotedSongListContainerProps {
    stage: string;
    params: PromotedSongListQueryParams;
}

export function PromotedSongListContainer({ stage, params }: PromotedSongListContainerProps) {
    const dispatch = useDispatch();
    const countries = useExtraDataBundle(["Country"], stage);

    const info = useSelector(promotedSongListPageSelector(stage, params));
    const songNames = useSelector((appState: AppState) => appState.promotedSong.songNames);

    const onFinish = (updatedItems: { data: Partial<PromotedSong>; file?: File }[]) => {
        const items = updatedItems.map(({ file, data }) => ({
            file,
            data: { ...info.data?.find((sourceItem) => sourceItem.id === data.id), ...data }
        }));

        dispatch(
            promotedSongPostAction({
                stage,
                items
            })
        );
    };

    const handleOnUpdateImage = async (data: PromotedSong, file: File) => {
        const validationResult = await validatePromotedSongImage(file);

        validationResult.ok ? onFinish([{ data, file }]) : message.error(validationResult.error);
    };

    const handleOnSelectSong = (item: PromotedSong) => (type: "songId" | "externalSongId", id: number) =>
        onFinish([{ data: { ...item, songId: null, externalSongId: null, [type]: id } }]);

    const columns: EditableTableV2Column<PromotedSong>[] = [
        {
            title: "ID",
            dataIndex: "id",
            width: 120
        },
        {
            title: "Thumbnail",
            render: (_, item) => (
                <ThumbnailCard
                    aspectRatio="335/94"
                    handleUpdate={(file: File) => handleOnUpdateImage(item, file)}
                    markers={["PNG"]}
                    imageUrl={createCdnURLFromFiles({
                        id: item.id,
                        files: item.files,
                        stage,
                        entityType: "PromotedSong",
                        resolution: "512x512"
                    })}
                />
            ),
            width: 220
        },
        {
            title: "Song",
            render: (_, { songId, externalSongId }) => {
                const id = songId ?? externalSongId;
                if (!id) return "<Null>";

                const type: PromotedSongType = songId !== null ? "song" : "externalSong";

                const nameKey = createPromotedSongNameKey(stage, id);
                const name = songNames[type][nameKey] ?? "";

                return <SongLink stage={stage} value={{ type, name, id }} />;
            },
            width: 220
        },
        {
            title: "Available Countries",
            width: 250,
            render: (_, item) =>
                item?.availableForCountries?.length ? (
                    item.availableForCountries.map((val) => (
                        <Tag key={val}>
                            {countries.bundle.Country?.data?.find((v) => v.isoName === val)?.displayName ?? ""}
                        </Tag>
                    ))
                ) : (
                    <Tag>All</Tag>
                )
        },
        {
            title: "Is Enabled",
            render: (_, { isEnabled }) => (
                <Badge color={isEnabled ? "blue" : "red"} text={isEnabled ? "Enabled" : "Disabled"} />
            ),
            width: 140
        },
        {
            title: "Sort Order",
            dataIndex: "sortOrder",
            width: 120,
            editableCellProps: { type: "number" },
            sorter: (a, b) => a.sortOrder - b.sortOrder
        },
        {
            title: <PromotedSongFormContainer />,
            width: 90,
            align: "right",
            render: (_, item) => (
                <Space>
                    <SelectSongDropdownContainer stage={stage} onSelect={handleOnSelectSong(item)}>
                        <Button icon={<MoreOutlined />} />
                    </SelectSongDropdownContainer>

                    <ChangePromotedSongStatus
                        isEnabled={item.isEnabled}
                        onChange={() => onFinish([{ data: { ...item, isEnabled: !item.isEnabled } }])}
                    />
                </Space>
            )
        }
    ];

    return (
        <EditableTableV2
            loading={info.loading && !info.data}
            columns={columns}
            dataSource={info.data}
            scroll={{ x: 800, y: "100vh - 264px" }}
            pagination={false}
            onFinish={(items) => onFinish(items.map((data) => ({ data })))}
        />
    );
}
