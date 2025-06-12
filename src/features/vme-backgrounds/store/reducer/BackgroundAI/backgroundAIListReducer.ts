import { AppState } from "app-state";
import { hashKeySelector, pageKeySelector } from "utils";
import { DEFAULT_BACKGROUND_AI_LIST_SIZE } from "urls";
import { calculateListTotal } from "shared/calculate-list-total";
import {
    backgroundAIListActionGroup,
    backgroundAIListLoadingAction,
    backgroundAIListLoadedErrorAction,
    backgroundAIListLoadedOkAction
} from "../../actions/BackgroundAI";
import { backgroundAIKeySelector } from "./backgroundAIEntitiesReducer";
import { BackgroundAIQueryParams } from "features/vme-backgrounds/services/BackgroundAI/getBackgroundsAI";
import { createListPageHashedReducer } from "shared/store";

export const backgroundAIListReducer = createListPageHashedReducer({
    group: backgroundAIListActionGroup,
    loading: backgroundAIListLoadingAction,
    loadedError: backgroundAIListLoadedErrorAction,
    loadedOk: backgroundAIListLoadedOkAction,
    keyFactory: (stage, themeCollection) => backgroundAIKeySelector(stage, themeCollection.id)
});

export const backgroundAIListSelector = (stage: string, params: BackgroundAIQueryParams) => (appState: AppState) => {
    const state = appState.backgroundAI.list[hashKeySelector(stage, params)];
    const page = state?.pages?.[pageKeySelector(params.skip)];

    const data = page?.map((el) => appState.backgroundAI.entities[el]!).filter(Boolean);

    const pageSize = Number(params?.take ?? DEFAULT_BACKGROUND_AI_LIST_SIZE);

    const currentPage = Math.floor((params.skip ?? 0) / pageSize) + 1;

    return {
        loading: state?.loading ?? false,
        error: state?.error,
        data,
        pageSize,
        currentPage,
        total: calculateListTotal(page?.length ?? 0, params.skip, pageSize)
    };
};

export const backgroundAIInfoByIdSelector = (stage: string, id: number) => (appState: AppState) => {
    const info = backgroundAIListSelector(stage, { id })(appState);

    const data = info.data?.[0];

    return {
        loading: info.loading ?? false,
        error: info.error,
        data
    };
};
