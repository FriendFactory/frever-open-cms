import React from "react";
import { Link } from "react-router-dom";

import { DETAILS_ASSET_URL, EXTERNAL_SONG_DETAILS_URL } from "urls";
import { PromotedSongType } from "../services";

interface SongLinkProps {
    stage: string;
    value: {
        type: PromotedSongType;
        name: string;
        id: number;
    };
}

export function SongLink({ value, stage }: SongLinkProps) {
    return (
        <Link
            to={
                value.type === "song"
                    ? DETAILS_ASSET_URL.format({ stage, asset: "Song", id: value.id })
                    : EXTERNAL_SONG_DETAILS_URL.format({ stage, id: value.id })
            }>
            {value.name || (value.type === "song" ? `Song ID: ${value.id}` : `External Song ID: ${value.id}`)}
        </Link>
    );
}
