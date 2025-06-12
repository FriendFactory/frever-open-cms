import React from "react";
import { Card, Col, List, Row } from "antd";

import { ProtectedLink, useCurrentStage } from "shared";
import { DETAILS_ASSET_URL, EXTERNAL_SONG_DETAILS_URL, USERSOUND_DETAILS_URL } from "urls";
import { SongInfo, UserSoundInfo } from "../../services";

export interface VideoDetailsMediaProps {
    songs: SongInfo[];
    userSounds: UserSoundInfo[];
}

export const VideoDetailsMedia = ({ songs, userSounds }: VideoDetailsMediaProps) => {
    const stage = useCurrentStage();
    return (
        <Card title="Media">
            {songs.length > 0 && (
                <List
                    itemLayout="vertical"
                    dataSource={filterUniqueMedia(songs)}
                    renderItem={(song, index) => (
                        <List.Item key={index}>
                            <Row gutter={[24, 24]}>
                                <Col xs={24} xl={12} xxl={8}>
                                    Song ID:{" "}
                                    {song.isExternal ? (
                                        <ProtectedLink
                                            target="_blank"
                                            feature="AssetFull"
                                            to={EXTERNAL_SONG_DETAILS_URL.format({
                                                stage,
                                                id: song.id
                                            })}>
                                            {song.id}
                                        </ProtectedLink>
                                    ) : (
                                        <ProtectedLink
                                            target="_blank"
                                            feature="AssetFull"
                                            to={DETAILS_ASSET_URL.format({
                                                stage,
                                                asset: "Song",
                                                id: song.id
                                            })}>
                                            {song.id}
                                        </ProtectedLink>
                                    )}
                                </Col>
                                <Col xs={24} xl={12} xxl={8}>
                                    Name: {song.title ?? "Unknown"}
                                </Col>
                                <Col xs={24} xl={12} xxl={8}>
                                    Artist: {song.artist ?? "Unknown"}
                                </Col>
                            </Row>
                        </List.Item>
                    )}
                />
            )}
            {userSounds.length > 0 && (
                <List
                    itemLayout="vertical"
                    dataSource={filterUniqueMedia(userSounds)}
                    renderItem={(userSound, index) => (
                        <List.Item key={index}>
                            <Row gutter={[24, 24]}>
                                <Col xs={24} xl={12} xxl={8}>
                                    Sound ID:{" "}
                                    <ProtectedLink
                                        target="_blank"
                                        feature="Social"
                                        to={USERSOUND_DETAILS_URL.format({ stage, id: userSound.id })}>
                                        {userSound.id}
                                    </ProtectedLink>
                                </Col>
                                <Col xs={24} xl={12} xxl={8}>
                                    Name: {userSound.name ?? "Unknown"}
                                </Col>
                            </Row>
                        </List.Item>
                    )}
                />
            )}
        </Card>
    );
};

const filterUniqueMedia = <T extends (SongInfo | UserSoundInfo)[]>(arr: T): T => {
    const uniqueSet = new Set();
    return arr.filter((val) => {
        if (!uniqueSet.has(val.id)) {
            uniqueSet.add(val.id);
            return true;
        }
        return false;
    }) as T;
};
