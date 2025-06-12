import { call } from "redux-saga/effects";

import { getTemplateEventSound } from "features/video-templates/services";
import { CdnLink, getCdnLink } from "features/user-media/services";
import { TemplateEventMusicController } from "features/video-templates/services";
import { FileExtensions } from "config";

export function* handleTemplateSoundURL(stage: string, eventId: number) {
    try {
        const response: TemplateEventMusicController = yield call(getTemplateEventSound, stage, eventId);

        const songEntity = response.song ?? response.userSound;
        const songFile = songEntity?.files.find((file) => file.extension === FileExtensions.Mp3);
        if (!songEntity || !songFile?.version) return;

        const cdnLink: CdnLink = yield call(getCdnLink, stage, {
            entityName: response.song ? ("Song" as any) : "UserSound",
            id: songEntity.id,
            version: songFile.version
        });

        if (cdnLink.ok) return cdnLink.link;
    } catch {}
    return;
}
