import React, { useCallback } from "react";
import { useHistory, useLocation } from "react-router";
import { Alert } from "antd";

import { GetVideoListParams } from "../services";
import { VideoFilterForm, VideoFilterFields } from "../components/VideoFilterForm";
import { VIDEO_MODERATION_LIST_URL } from "urls";
import { dateToForm, dateToUrl } from "utils";
import { useExtraDataBundle } from "shared";

export function VideoFilterFormContainer({}: {}) {
    const location = useLocation();
    const history = useHistory();

    const urlMatch = VIDEO_MODERATION_LIST_URL.match(location);
    const extraData = useExtraDataBundle(["Country", "Language"]);

    if (!urlMatch.isMatched) return <Alert message="Invalid URL" />;

    const handleChange = useCallback(
        (form: VideoFilterFields) => {
            const newUrl = VIDEO_MODERATION_LIST_URL.replace(location, {}, { ...toUrlParams(form), skip: 0 });
            if (newUrl) history.push(newUrl);
        },
        [history, location]
    );

    const values = toFormValues(urlMatch.query || {});

    return (
        <VideoFilterForm
            value={values}
            onChange={handleChange}
            countries={extraData.bundle.Country?.data}
            languages={extraData.bundle.Language?.data}
        />
    );
}

export const toFormValues = (params: GetVideoListParams): VideoFilterFields => ({
    ...params,
    date: params.date ? dateToForm(params.date) : undefined,
    video: params.video ? params.video.toString() : undefined,
    orderBy: params.orderBy ?? "",
    access: params.access ? Number(params.access) : undefined
});

export const toUrlParams = (form: VideoFilterFields): GetVideoListParams => ({
    ...form,
    fromTemplate: !form.templateId && form.fromTemplate ? form.fromTemplate : undefined,
    fromTask: !form.schoolTaskId && form.fromTask ? form.fromTask : undefined,
    date: form.date ? dateToUrl(form.date) : undefined,
    video: form.video
        ?.split(",")
        .map((el) => el.trim())
        .filter(Boolean)
});
