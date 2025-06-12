import React, { useCallback, useState } from "react";
import { useLocation } from "react-router";
import { useSelector } from "react-redux";
import { Button, Card } from "antd";
import { useDispatch } from "react-redux";

import { PLAYLIST_DETAILS_PAGE_URL } from "urls";
import { playlistDetailsPageSelector } from "features/external-music/store/reducer/playlists/playlistDetails.reducer";
import { updatePlaylistDetailsAction } from "features/external-music/store/actions";
import { Playlist } from "features/external-music/services";
import { PlaylistDetailsForm } from "features/external-music/components/PlaylistDetailsForm";
import { FixedPageHeader, useExtraData } from "shared";

const PLAYLIST_FORM_ID = "playlist-form-id";

export function PlaylistFormContainer() {
    const location = useLocation();
    const dispatch = useDispatch();
    const urlMatch = PLAYLIST_DETAILS_PAGE_URL.match(location, true);

    if (!urlMatch.isMatched) return null;

    const { stage, id } = urlMatch.params;
    const [isSaveHeaderOpen, setIsSaveHeaderOpen] = useState<boolean>(false);
    const info = useSelector(playlistDetailsPageSelector(id));
    const countries = useExtraData({ stage, name: "Country" });

    const updatePlaylistDetails = useCallback(
        (form: Partial<Playlist>) => {
            const data = { id: info.data?.id, ...form };
            if (info.data?.externalPlaylistId && form.externalPlaylist) {
                data.externalPlaylist = { ...form.externalPlaylist, id: info.data.externalPlaylistId };
            }
            dispatch(updatePlaylistDetailsAction({ stage: stage, data }));
            setIsSaveHeaderOpen(false);
        },
        [stage, id, info.data]
    );

    return (
        <Card loading={info.loading || countries.loading}>
            <PlaylistDetailsForm
                stage={stage}
                countries={countries.data}
                gutter={[24, 24]}
                colProps={{ xs: 24, md: 12 }}
                id={PLAYLIST_FORM_ID}
                initialValues={{ ...info.data, countries: info.data?.countries ?? undefined }}
                onFieldsChange={() => setIsSaveHeaderOpen(true)}
                onFinish={updatePlaylistDetails}
                onReset={() => setIsSaveHeaderOpen(false)}
            />
            {isSaveHeaderOpen && (
                <FixedPageHeader
                    title="Unsaved changes"
                    extra={[
                        <Button key="save-playlist-form" htmlType="reset" form={PLAYLIST_FORM_ID}>
                            Discard
                        </Button>,
                        <Button key="discard-playlist-form" type="primary" htmlType="submit" form={PLAYLIST_FORM_ID}>
                            Save
                        </Button>
                    ]}
                />
            )}
        </Card>
    );
}
