import React from "react";
import { UrlPath } from "rd-url-utils";
import { useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router";

import { AppState } from "app-state";
import { VideoDetailsHeader } from "../components/VideoDetailsHeader";
import { useKeyPress } from "shared/hooks/useKeyPress";

export interface VideoDetailsHeaderContainerProps {
    url: UrlPath<{ stage: string; id: number }, any>;
}

export function VideoDetailsHeaderContainer({ url }: VideoDetailsHeaderContainerProps) {
    const location = useLocation();
    const history = useHistory();
    const urlMatch = url.match(location);

    if (!urlMatch.isMatched) {
        return null;
    }

    const { loading, result } = useSelector((state: AppState) => state.closerVideosIdsStatus);

    const handleChangeVideo = (id: number) => {
        if (
            id !== Number(urlMatch.params.id) &&
            document.activeElement?.tagName !== "INPUT" &&
            !document.querySelectorAll(".ant-modal-root").length
        ) {
            const newUrl = url.replace(location, { id });

            if (newUrl) {
                history.replace(newUrl);
            }
        }
    };

    const prevVideo = () => result?.prevVideoId && handleChangeVideo(result.prevVideoId);
    const nextVideo = () => result?.nextVideoId && handleChangeVideo(result.nextVideoId);

    useKeyPress(["ArrowLeft"], prevVideo);
    useKeyPress(["ArrowRight"], nextVideo);

    return (
        <VideoDetailsHeader
            id={urlMatch.params.id}
            isPrevVideoAvailable={!!result?.prevVideoId && !loading}
            isNextVideoAvailable={!!result?.nextVideoId && !loading}
            goBack={history.goBack}
            nextVideo={nextVideo}
            prevVideo={prevVideo}
        />
    );
}
