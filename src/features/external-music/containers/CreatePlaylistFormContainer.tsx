import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Button, message, Modal } from "antd";
import { useLocation } from "react-router";

import { createPlaylistAction } from "../store/actions";
import { PlaylistDetailsForm } from "../components/PlaylistDetailsForm";
import { PLAYLISTS_BASE_URL } from "urls";
import { ExternalPlaylist, Playlist } from "../services";
import { PlusOutlined } from "@ant-design/icons";

const CREATE_PLAYLIST_FORM_ID = "create-playlist-form";

export function CreatePlaylistFormContainer() {
    const dispatch = useDispatch();
    const location = useLocation();
    const urlMatch = PLAYLISTS_BASE_URL.match(location);

    if (!urlMatch.isMatched) {
        message.warning("Create Playlist feature can't work on this page");
        return null;
    }

    const { stage } = urlMatch.params;
    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => setIsModalOpen(true);
    const hideModal = () => setIsModalOpen(false);

    const createPlaylist = (data: Playlist & { externalPlaylist: ExternalPlaylist }) => {
        dispatch(createPlaylistAction({ stage, data }));
        hideModal();
    };

    return (
        <>
            <Button type="primary" ghost onClick={showModal} icon={<PlusOutlined />} />
            <Modal
                title="Create Playlist"
                width={768}
                style={{ top: "20px" }}
                styles={{ body: { overflowY: "auto", maxHeight: "calc(100vh - 152px)" } }}
                open={isModalOpen}
                destroyOnClose
                footer={[
                    <Button key="playlist-cancel" onClick={hideModal}>
                        Cancel
                    </Button>,
                    <Button key="playlist-submit" htmlType="submit" type="primary" form={CREATE_PLAYLIST_FORM_ID}>
                        Create
                    </Button>
                ]}
                onCancel={hideModal}
                maskClosable={false}>
                <PlaylistDetailsForm stage={stage} onFinish={createPlaylist} id={CREATE_PLAYLIST_FORM_ID} />
            </Modal>
        </>
    );
}
