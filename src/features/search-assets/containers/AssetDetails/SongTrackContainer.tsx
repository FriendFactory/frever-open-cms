import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import { Col, message, Row, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import path from "path";

import { assetDetailsSelector, updateAssetSongAction } from "features/search-assets/store";
import { DETAILS_ASSET_URL } from "urls";
import { FileExtensions } from "config";
import { CdnLink, getCdnLink } from "features/user-media/services";
import { AudioPlayer } from "shared/components/AudioPlayer";

export function SongTrackContainer() {
    const location = useLocation();
    const urlMatch = DETAILS_ASSET_URL.match(location);
    const dispatch = useDispatch();

    if (!urlMatch.isMatched) return <div></div>;

    const [url, setUrl] = useState("");
    const { asset, stage, id } = urlMatch.params;

    const info = useSelector(assetDetailsSelector(stage, asset, id));

    useEffect(() => {
        (async () => {
            const audioUrl = info.data?.files.find((el) => el.extension === FileExtensions.Mp3);
            if (info.data && audioUrl?.version) {
                const newUrl: CdnLink = await getCdnLink(stage, {
                    id: info.data.id,
                    entityName: "Song" as any,
                    version: audioUrl?.version
                });

                setUrl(newUrl.link);
            }
        })();
    }, [info.data]);

    const handleUpdate = (file: File) => {
        const extension = path.extname(file.name).toLowerCase();
        if (extension === ".mp3") {
            dispatch(updateAssetSongAction({ stage, asset, info: { id, extension: FileExtensions.Mp3 }, data: file }));
        } else {
            message.error(`The selected file is not ".mp3" extension.`);
        }
    };

    const replaceOption = [
        {
            label: (
                <Upload
                    showUploadList={false}
                    accept="audio/mpeg"
                    customRequest={({ file }) => {
                        handleUpdate(file as File);
                    }}>
                    Replace
                </Upload>
            ),
            key: "replace",
            icon: <UploadOutlined />
        }
    ];

    return (
        <Row align="middle" wrap={false}>
            <Col key={url} flex="auto">
                <AudioPlayer src={url} extraMoreOptions={replaceOption} />
            </Col>
        </Row>
    );
}
