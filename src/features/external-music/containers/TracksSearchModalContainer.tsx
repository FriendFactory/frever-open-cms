import React, { useCallback, useState } from "react";
import { Button, Col, Input, Modal, Pagination, Row, Select, Space } from "antd";
import { useSelector } from "react-redux";
import { shallowEqual, useDispatch } from "react-redux";
import { useLocation } from "react-router";
import { SearchOutlined } from "@ant-design/icons";

import { useTracksSearch } from "features/external-music/hooks/useTracksSearch";
import { PlaylistTrackInfo, SearchCountries, TracksSearchResultEntityTrack } from "features/external-music/services";
import { addTracksToPlaylistAction } from "features/external-music/store/actions";
import { playlistDetailsPageSelector } from "features/external-music/store/reducer/playlists/playlistDetails.reducer";
import { PLAYLIST_DETAILS_PAGE_URL } from "urls";
import { TracksList } from "features/external-music/components/TracksList";
import { useTrackDetails } from "../hooks/useTrackDetails";
import { TracksSearchResultEntity } from "../services/getTracks";

const SearchTypes = ["search", "track"] as const;
const DEFAULT_SEARCH_COUNTRY_QUERY = "SE";
const DEFAULT_SEARCH_TYPE = "search";

export interface TracksSearchModalContainerProps {}

export function TracksSearchModalContainer({}: TracksSearchModalContainerProps) {
    const dispatch = useDispatch();
    const location = useLocation();
    const urlMatch = PLAYLIST_DETAILS_PAGE_URL.match(location, true);
    const [country, setCountry] = useState(DEFAULT_SEARCH_COUNTRY_QUERY);
    const [searchType, setSearchType] = useState<typeof SearchTypes[number]>(DEFAULT_SEARCH_TYPE);

    if (!urlMatch.isMatched) return null;

    const { stage, id } = urlMatch.params;

    const [isModalOpen, setIsModalOpen] = useState(false);
    const { info, onSearch, pageChange } = useTracksSearch(stage);
    const { infoTrackDetails, onSearchTrackDetails } = useTrackDetails(stage);

    const currentPlaylistInfo = useSelector(playlistDetailsPageSelector(id), shallowEqual);
    const externalPlaylist = currentPlaylistInfo.data?.externalPlaylist;

    const handleAddTracksToPlaylist = useCallback(
        (track: TracksSearchResultEntityTrack) => () =>
            externalPlaylist?.id &&
            dispatch(
                addTracksToPlaylistAction({
                    stage,
                    externalPlaylistId: externalPlaylist.id,
                    tracks: [createPlaylistTrackInfo(track)]
                })
            ),
        [externalPlaylist?.id]
    );

    const cheackIsTrackInPlaylist = useCallback(
        (track: TracksSearchResultEntityTrack) => externalPlaylist?.tracks?.some((el) => track.id == el.trackId),
        [externalPlaylist?.tracks]
    );

    const resultData: TracksSearchResultEntity[] | undefined =
        searchType === "search"
            ? info.data
            : infoTrackDetails.data
            ? [{ track: infoTrackDetails.data, type: "track", score: 0 }]
            : undefined;

    return (
        <>
            <Button type="primary" ghost icon={<SearchOutlined />} onClick={() => setIsModalOpen(true)} />

            <Modal
                title={
                    <span>
                        <h4>Search for tracks</h4>
                        <Row>
                            <Space.Compact style={{ width: "100%" }}>
                                <Col>
                                    <Select
                                        style={{ width: 60 }}
                                        options={SearchCountries.map((country) => ({ label: country, value: country }))}
                                        defaultValue={country}
                                        onChange={(value) => setCountry(value)}
                                    />
                                </Col>
                                <Col>
                                    <Select
                                        style={{ width: 85 }}
                                        options={SearchTypes.map((type) => ({
                                            label: type.replace(/^./, (str) => str.toUpperCase()),
                                            value: type
                                        }))}
                                        defaultValue={DEFAULT_SEARCH_TYPE}
                                        value={searchType}
                                        onChange={(value) => setSearchType(value as typeof SearchTypes[number])}
                                    />
                                </Col>
                                <Col flex="1 0 auto">
                                    <Input.Search
                                        type={searchType === "track" ? "number" : "text"}
                                        placeholder={
                                            searchType === "track"
                                                ? "Track ID..."
                                                : "Track title, artist name, or ISRC..."
                                        }
                                        onSearch={(value) =>
                                            searchType === "search"
                                                ? onSearch(value, country)
                                                : onSearchTrackDetails(Number(value), country)
                                        }
                                    />
                                </Col>
                            </Space.Compact>
                        </Row>
                    </span>
                }
                footer={
                    <Pagination
                        current={info.currentPage}
                        total={info.total}
                        pageSize={info.pageSize}
                        onChange={pageChange}
                    />
                }
                onCancel={() => setIsModalOpen(false)}
                open={isModalOpen}
                destroyOnClose
                width={1024}
                style={{ top: "20px" }}
                styles={{ body: { overflowY: "auto", height: "calc(100vh - 256px)" } }}>
                <TracksList
                    stage={stage}
                    loading={searchType === "search" ? info.loading : infoTrackDetails.loading}
                    data={resultData}
                    cheackIsTrackInPlaylist={cheackIsTrackInPlaylist}
                    addTracksToPlaylist={handleAddTracksToPlaylist}
                    country={country}
                />
            </Modal>
        </>
    );
}

const createPlaylistTrackInfo = (track: TracksSearchResultEntityTrack): PlaylistTrackInfo => ({
    trackId: track.id,
    trackTitle: track.title,
    trackVersion: track.version,
    artistAppearsAs: track.artist.appearsAs,
    releaseId: track.release.id,
    releaseArtistAppearsAs: track.release.artist.appearsAs
});
