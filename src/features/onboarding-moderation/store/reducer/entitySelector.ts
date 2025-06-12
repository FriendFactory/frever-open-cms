import { AppState } from "app-state";
import { OnboardingData, OnboardingDataNames } from "features/onboarding-moderation/services";
import { PagingInfoSelectResult } from "shared";
import {
    ONBOARDING_QUEST_GROUP_LIST_PAGE_SIZE,
    ONBOARDING_QUEST_LIST_PAGE_SIZE,
    ONBOARDING_REWARD_LIST_PAGE_SIZE
} from "urls";
import { hashKeySelector, pageKeySelector } from "utils";

export interface OnboardingEntityPageSelectorResult<T extends OnboardingDataNames> {
    error?: string;
    loading: boolean;
    stage: string;
    data?: OnboardingData[T]["data"][];
}

export function onboardingEntityPageSelector<T extends OnboardingDataNames>(
    stage: string,
    params: OnboardingData[T]["queryParams"],
    entityType: T
): (appState: AppState) => OnboardingEntityPageSelectorResult<T> {
    return ({ onboarding }) => {
        const pageState = onboarding[entityType].list[hashKeySelector(stage, params)];

        const data = pageState?.pages[pageKeySelector(params.skip)]?.reduce<OnboardingData[T]["data"][]>((acc, key) => {
            const entity = onboarding[entityType].entities[key];
            if (entity) acc.push(entity);
            return acc;
        }, []);

        return {
            error: pageState?.error,
            loading: pageState?.loading ?? false,
            data,
            stage
        };
    };
}

export function onboardingEntityPagerSelector<T extends OnboardingDataNames = OnboardingDataNames>(
    stage: string,
    params: OnboardingData[T]["queryParams"],
    entityType: T
) {
    return ({ onboarding }: AppState): PagingInfoSelectResult & { error?: string } => {
        const status = onboarding[entityType]?.list[hashKeySelector(stage, params)];

        let takeDefault: number;
        switch (entityType) {
            case "quest":
                takeDefault = ONBOARDING_QUEST_LIST_PAGE_SIZE;
                break;
            case "questGroup":
                takeDefault = ONBOARDING_QUEST_GROUP_LIST_PAGE_SIZE;
                break;
            case "reward":
                takeDefault = ONBOARDING_REWARD_LIST_PAGE_SIZE;
                break;
            default:
                takeDefault = 999;
        }

        const pageSize = params.take || takeDefault;

        const currentPage = Math.floor((params.skip ?? 0) / pageSize) + 1;

        return {
            error: status?.error,
            total: status?.total ?? 0,
            pageSize,
            currentPage
        };
    };
}
