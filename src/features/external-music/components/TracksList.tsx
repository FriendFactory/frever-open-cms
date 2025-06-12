import React, { useState } from "react";
import { List, Button, Typography, Avatar } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import useBreakpoint from "antd/lib/grid/hooks/useBreakpoint";

import { TracksSearchResultEntityTrack } from "features/external-music/services";
import { TracksSearchResultEntity } from "features/external-music/services/getTracks";
import { AudioPreview } from "./AudioPreview";

export interface TracksListProps {
    stage: string;
    loading: boolean;
    data?: TracksSearchResultEntity[];
    cheackIsTrackInPlaylist: (track: TracksSearchResultEntityTrack) => boolean | undefined;
    addTracksToPlaylist: (track: TracksSearchResultEntityTrack) => () => void;
    country: string;
}

export function TracksList({
    stage,
    loading,
    data,
    cheackIsTrackInPlaylist,
    addTracksToPlaylist,
    country
}: TracksListProps) {
    const [currentTrackId, setCurrentTrackId] = useState<string | null>(null);
    const { md } = useBreakpoint();
    const handleOnPlay = (id: string) => () => setCurrentTrackId(id);
    return (
        <List
            itemLayout={md ? "horizontal" : "vertical"}
            loading={loading}
            dataSource={data}
            renderItem={(item) => (
                <List.Item
                    extra={
                        <Button
                            type="primary"
                            ghost
                            disabled={cheackIsTrackInPlaylist(item.track)}
                            onClick={addTracksToPlaylist(item.track)}
                            icon={<PlusOutlined />}
                            style={{ marginLeft: "3em", marginRight: "1em" }}
                        />
                    }>
                    <List.Item.Meta
                        avatar={<Avatar shape="square" size={100} src={item.track.release.image} />}
                        title={item.track.title}
                        description={
                            <span>
                                <p>{item.track.artist.name}</p>
                                <p>
                                    {item.track.explicitContent && (
                                        <Typography.Text type="warning">Explicit</Typography.Text>
                                    )}
                                </p>
                            </span>
                        }
                    />
                    <AudioPreview
                        stage={stage}
                        trackId={item.track.id}
                        isPlaying={item.track.id === currentTrackId}
                        onPlay={handleOnPlay(item.track.id)}
                        country={country}
                    />
                </List.Item>
            )}
        />
    );
}
