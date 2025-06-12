import React, { useState } from "react";
import { useLocation } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, List, Avatar, Typography, Space } from "antd";
import { MinusOutlined } from "@ant-design/icons";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";
import ReactDragListView from "react-drag-listview";

import { PLAYLIST_DETAILS_PAGE_URL } from "urls";
import { playlistDetailsPageSelector } from "features/external-music/store/reducer/playlists/playlistDetails.reducer";
import { TracksSearchModalContainer } from "../TracksSearchModalContainer";
import { replaceExternalPlayistAction, removeTrackFromPlaylistAction } from "features/external-music/store/actions";
import { ExternalPlaylist, ExternalTrack } from "features/external-music/services";
import { AudioPreview } from "features/external-music/components/AudioPreview";
import { InputNumberBlur } from "shared";

export function PlaylistTracksContainer() {
    const dispatch = useDispatch();
    const location = useLocation();
    const { md } = useBreakpoint();
    const urlMatch = PLAYLIST_DETAILS_PAGE_URL.match(location, true);

    if (!urlMatch.isMatched) return null;

    const { stage, id } = urlMatch.params;
    const { data, loading } = useSelector(playlistDetailsPageSelector(id));

    const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);

    const removeTrack = (playlistTrackId: string) => {
        data?.externalPlaylistId &&
            dispatch(
                removeTrackFromPlaylistAction({
                    stage,
                    externalPlaylistId: data?.externalPlaylistId,
                    playlistTrackId
                })
            );
    };

    const handleOnDragEnd = (fromIndex: number, toIndex: number) => {
        const playlist: Partial<ExternalPlaylist> = { ...data?.externalPlaylist };

        if (toIndex < 0 || !playlist.tracks) return;

        const item = playlist.tracks.splice(fromIndex, 1)[0];
        playlist.tracks.splice(toIndex, 0, item);
        dispatch(
            replaceExternalPlayistAction({
                stage,
                playlist
            })
        );
    };

    const handleOnChangeOrder = (track: ExternalTrack) => (toIndex: string | number | null | undefined) => {
        const playlist: Partial<ExternalPlaylist> = { ...data?.externalPlaylist };
        const tracks = playlist.tracks;
        const isValidIndex = (index: number, arrayLength: number) => index >= 0 && index < arrayLength;

        if (toIndex === null || toIndex === undefined || !tracks) return;

        const fromIndex = tracks.findIndex((val) => val.trackId === track.trackId);
        if (
            fromIndex === toIndex ||
            !isValidIndex(fromIndex, tracks.length) ||
            !isValidIndex(Number(toIndex), tracks.length)
        ) {
            return;
        }

        const element = tracks.splice(fromIndex, 1)[0];

        tracks.splice(Number(toIndex), 0, element);

        dispatch(
            replaceExternalPlayistAction({
                stage,
                playlist
            })
        );
    };

    const handleOnPlay = (id: string) => () => setCurrentTrackId(id);

    return (
        <Card title="Songs" loading={loading} extra={data?.externalPlaylistId && <TracksSearchModalContainer />}>
            <ReactDragListView nodeSelector=".ant-list-item.draggble" onDragEnd={handleOnDragEnd}>
                <List
                    itemLayout={md ? "horizontal" : "vertical"}
                    dataSource={data?.externalPlaylist?.tracks}
                    renderItem={(item, index) => {
                        return (
                            <List.Item
                                key={item.trackId}
                                className="draggble"
                                extra={
                                    <Space>
                                        <div onMouseDown={(e) => e.stopPropagation()}>
                                            <InputNumberBlur
                                                onChangeOrder={handleOnChangeOrder(item)}
                                                value={index}
                                                min={0}
                                                max={
                                                    data?.externalPlaylist?.tracks
                                                        ? data?.externalPlaylist?.tracks?.length - 1
                                                        : 0
                                                }
                                                style={{ width: 60, marginLeft: "3em" }}
                                            />
                                        </div>
                                        <Button danger icon={<MinusOutlined />} onClick={() => removeTrack(item.id)} />
                                    </Space>
                                }>
                                <List.Item.Meta
                                    avatar={<Avatar shape="square" size={100} src={addImageSizeToUrl(item.image)} />}
                                    title={
                                        <>
                                            {item.trackTitle}{" "}
                                            <Typography.Text type="secondary">{`#${index + 1}`}</Typography.Text>
                                        </>
                                    }
                                    description={item.artistAppearsAs}
                                />
                                <AudioPreview
                                    stage={stage}
                                    trackId={item.trackId}
                                    isPlaying={item.id === currentTrackId}
                                    onPlay={handleOnPlay(item.id)}
                                />
                            </List.Item>
                        );
                    }}
                />
            </ReactDragListView>
        </Card>
    );
}

const addImageSizeToUrl = (url: string) => url.replace("$size$", "182");
