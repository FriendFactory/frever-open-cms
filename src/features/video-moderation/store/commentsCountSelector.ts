import { AppState } from "app-state";
import { VideoCommentsQueryParams } from "features/video-comments/services";
import { videoCommentsHashKeySelector } from "features/video-comments/store/reducer/videoCommentListPageReducer";
import { videoInfoKeySelector } from "./reducer/video/videoEntitiesReducer";

export const videoCommentCountSelector =
    (stage: string, params?: VideoCommentsQueryParams) =>
    (appState: AppState): number | string => {
        let count;

        if (params) {
            const newCount = appState.videoComments?.listPages[videoCommentsHashKeySelector(stage, params)]?.total;
            if (newCount) count = newCount;
        }

        if (params?.videoId) {
            const key = videoInfoKeySelector(stage, params.videoId);
            const newCount = appState.videoModeration.entities[key]?.video.kpi?.comments;
            if (newCount) count = newCount;
        }

        return count ?? 0;
    };
