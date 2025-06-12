import { Alert, Tabs } from "antd";
import React, { useCallback } from "react";
import { useHistory, useLocation } from "react-router";
import { UrlPath } from "rd-url-utils";
import { useSelector } from "react-redux";

import { VIDEO_MODERATION_COMMENTS_URL, VIDEO_MODERATION_DETAILS_URL } from "urls";
import { videoCommentCountSelector } from "../store/commentsCountSelector";

export interface SearchTabsProps {
    children: React.ReactChild | React.ReactChild[];
    url: UrlPath<{ stage: string; id: number }, {}>;
    activeTab: "video" | "comments";
}

export function VideoDetailsTabsContainer({ children, url, activeTab }: SearchTabsProps) {
    const location = useLocation();
    const history = useHistory();
    const urlMatch = url.match(location);

    if (!urlMatch.isMatched) return <Alert message="Invalid URL" />;

    const commentCount = useSelector(
        videoCommentCountSelector(urlMatch.params.stage, { videoId: urlMatch.params.id, ...urlMatch.query })
    );

    const handleChangeTab = useCallback(
        (tab: string) =>
            history.replace(
                (tab === "comments" ? VIDEO_MODERATION_COMMENTS_URL : VIDEO_MODERATION_DETAILS_URL).format({
                    stage: urlMatch.params.stage,
                    id: urlMatch.params.id
                })
            ),
        [history, location]
    );

    return (
        <Tabs
            activeKey={activeTab}
            onTabClick={handleChangeTab}
            animated={false}
            items={[
                { key: "video", label: "Video Info", children },
                {
                    key: "comments",
                    label: `Comments (${commentCount})`,
                    children
                }
            ]}
        />
    );
}
