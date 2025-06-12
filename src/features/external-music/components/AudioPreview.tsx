import React, { useEffect, useState } from "react";
import { message } from "antd";

import { getAudioPreviewUrl } from "../services/getAudioPreviewUrl";
import { AudioPlayer } from "shared";
import { SearchCountries } from "../services";

export interface AudioPreviewProps {
    stage: string;
    trackId: number | string;
    isPlaying: boolean;
    onPlay?: () => void;
    country?: string;
}

export function AudioPreview({ stage, trackId, isPlaying, onPlay, country }: AudioPreviewProps) {
    const [src, setSrc] = useState<string>("/");

    useEffect(() => {
        (async () => {
            try {
                if (country) {
                    const src = await getAudioPreviewUrl(stage, trackId, country);
                    setSrc(src);
                } else {
                    for (const searchCountry of SearchCountries) {
                        const src = await getAudioPreviewUrl(stage, trackId, searchCountry);
                        const audioUrl = await fetch(src);
                        if (audioUrl.ok) {
                            setSrc(src);
                            break;
                        }
                    }
                }
            } catch (e) {
                message.error("Failed to sign Audio URL");
            }
        })();
    }, [trackId]);

    return src ? <AudioPlayer onPlay={onPlay} forceStop={!isPlaying && true} src={src} /> : null;
}
