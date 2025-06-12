import React from "react";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";

import { onboardingEntityPageSelector } from "features/onboarding-moderation/store/reducer/entitySelector";
import { cleanEmptyValues } from "features/onboarding-moderation/helpers";
import { OnboardingInfo } from "../../components/OnboardingInfo";
import { OnboardingQuestGroup } from "../../services";
import { updateEntityListAction } from "../../store/actions";

export interface QuestGroupDetailsInfoContainerProps {
    stage: string;
    id: number;
}

export function QuestGroupDetailsInfoContainer({ stage, id }: QuestGroupDetailsInfoContainerProps) {
    const dispatch = useDispatch();

    const { data, loading } = useSelector(onboardingEntityPageSelector(stage, { id }, "questGroup"));

    const handleOnSubmit = (formData: Partial<OnboardingQuestGroup>) => {
        const sourceData = data?.[0];
        const files: any = sourceData?.files?.length ? sourceData?.files : null;
        const mergedObject = _.merge(sourceData, formData);
        const entity = cleanEmptyValues({ ...mergedObject, files }, ["title", "description"]);

        dispatch(
            updateEntityListAction({
                stage,
                entityType: "questGroup",
                entity
            })
        );
    };

    return <OnboardingInfo data={data?.[0]} loading={!data && loading} handleOnSubmit={handleOnSubmit} />;
}
