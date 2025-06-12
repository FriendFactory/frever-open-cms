import React from "react";
import { Card, Image } from "antd";

import { Item } from "./Item";
import { createCdnURLFromFiles, ProtectedLink } from "shared";
import { DETAILS_ASSET_URL, USERSOUND_DETAILS_URL } from "urls";
import { LevelEvent } from "features/level-moderation/services";
import { ReadinessTag } from "shared/components/ReadinessTag";

export interface MusicCardProps {
    stage: string;
    musicController: LevelEvent["musicController"];
}

export function MusicCard({ stage, musicController }: MusicCardProps) {
    return musicController?.length ? (
        <Card type="inner" bordered={false} title="Music">
            {musicController.map((song) => (
                <Item key={song.id}>
                    <Item.Thumbnail>
                        <Image
                            width={128}
                            src={
                                song.song
                                    ? createCdnURLFromFiles({
                                          id: song.song.id,
                                          files: song.song?.files ?? [],
                                          stage,
                                          entityType: "Song",
                                          resolution: "512x512"
                                      })
                                    : ""
                            }
                        />
                    </Item.Thumbnail>
                    <Item.Text label="Asset Type">Song</Item.Text>

                    {song.songId ? (
                        <Item.Text label="ID">
                            <ProtectedLink
                                feature="AssetFull"
                                to={DETAILS_ASSET_URL.format({ stage, asset: "Song", id: song.songId })}>
                                {song.songId}
                            </ProtectedLink>
                        </Item.Text>
                    ) : (
                        <></>
                    )}

                    {song.userSoundId ? (
                        <Item.Text label="User Sound ID">
                            <ProtectedLink
                                feature="Social"
                                to={USERSOUND_DETAILS_URL.format({ stage, id: song.userSoundId })}>
                                {song.userSoundId}
                            </ProtectedLink>
                        </Item.Text>
                    ) : (
                        <></>
                    )}

                    {song.songId ? (
                        <Item.Text label="Readiness">
                            {song.song?.readinessId ? (
                                <ReadinessTag stage={stage} readinessId={song.song.readinessId} />
                            ) : (
                                "Unknown"
                            )}
                        </Item.Text>
                    ) : (
                        <></>
                    )}

                    {song.songId ? <Item.Text label="Name">{song.song?.name ?? "Unknown"}</Item.Text> : <></>}
                    <Item.Text label="ActivationCue">{song.activationCue ?? "Unknown"}</Item.Text>
                    <Item.Text label="EndCue">{song.endCue ?? "Unknown"}</Item.Text>
                </Item>
            ))}
        </Card>
    ) : null;
}
