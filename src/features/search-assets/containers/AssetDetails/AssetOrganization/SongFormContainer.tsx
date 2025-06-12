import React from "react";
import { useSelector } from "react-redux";

import { AssetForm, SongOrganization, CommonFormItems } from "features/search-assets/components";
import { assetDetailsSelector } from "features/search-assets/store";
import { CommonFormContainerProps } from ".";
import { useExtraDataBundle } from "shared/hooks/useExtraData";
import dayjs from "dayjs";

export function SongFormContainer({ stage, id, onSubmit }: CommonFormContainerProps) {
    const info = useSelector(assetDetailsSelector(stage, "Song", id));
    const extra = useExtraDataBundle(["Readiness", "Artist", "Label", "Genre", "Mood", "Emotion"]);

    return (
        <AssetForm
            initialValues={{
                ...info.data,
                publicationDate: info.data?.publicationDate ? dayjs.utc(info.data?.publicationDate) : null,
                depublicationDate: info.data?.depublicationDate ? dayjs.utc(info.data?.depublicationDate) : null,
                emotions: info.data?.emotions ?? undefined
            }}
            loading={(!info.data && info.loading) || extra.loading}
            disabled={info.loading}
            onSubmit={onSubmit}
            informationSection={
                info.data && <CommonFormItems name="name" readinessList={extra.bundle["Readiness"]?.data ?? []} />
            }
            organizationSection={
                info.data && <SongOrganization stage={stage} data={info.data} bundleData={extra.bundle} />
            }
        />
    );
}
