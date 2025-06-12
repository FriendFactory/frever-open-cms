import React from "react";
import dayjs from "dayjs";
import { Descriptions } from "antd";

import { ExternalSong } from "features/search-assets/services";

const { Item } = Descriptions;

export interface ExternalSongListExpandedRowProps {
    data: ExternalSong;
    excludedCountries: string[];
}

export function ExternalSongListExpandedRow({ data, excludedCountries }: ExternalSongListExpandedRowProps) {
    return (
        <Descriptions column={24}>
            <Item label="Song Name" span={24}>
                {data.songName}
            </Item>
            <Item label="Artist Name" span={24}>
                {data.artistName}
            </Item>
            <Item label="ISRC" span={24}>
                {data.isrc ?? "<Null>"}
            </Item>
            <Item label="Exluded Countries" span={24}>
                {excludedCountries.join(", ")}
            </Item>
            <Item label="Last License Check" span={24}>
                {data.lastLicenseStatusCheckAt
                    ? dayjs.utc(data.lastLicenseStatusCheckAt).format("DD MMM YYYY HH:mm:ss")
                    : "<Null>"}
            </Item>
            <Item label="Uncleared Since" span={24}>
                {data.notClearedSince ? dayjs.utc(data.notClearedSince).format("DD MMM YYYY HH:mm:ss") : "<Null>"}
            </Item>
            <Item label="Challenge Sort Order" span={24}>
                {data.challengeSortOrder ?? "<Null>"}
            </Item>
            <Item label="Sort Order" span={24}>
                {data.sortOrder ?? "<Null>"}
            </Item>
            <Item label="Status" span={24}>
                {data.isDeleted ? "Deleted" : "Active"}
            </Item>
        </Descriptions>
    );
}
