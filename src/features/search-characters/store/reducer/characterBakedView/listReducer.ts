import { AppState } from "app-state";
import { hashKeySelector, pageKeySelector } from "utils";
import { DEFAULT_CHARACTER_BAKED_VIEW_LIST_PAGE_SIZE } from "urls";
import { createListPageHashedReducer } from "shared/store";
import {
    characterBakedViewActionGroup,
    characterBakedViewLoadedErrorAction,
    characterBakedViewLoadedOkAction,
    characterBakedViewLoadingAction
} from "../../actions";
import { CharacterBakedViewParams } from "features/search-characters/services/getCharacterBakedView";
import { characterBakedViewSelector } from "./entitiesReducer";
import { calculateListTotal } from "shared/calculate-list-total";

export const listReducer = createListPageHashedReducer({
    group: characterBakedViewActionGroup,
    loading: characterBakedViewLoadingAction,
    loadedError: characterBakedViewLoadedErrorAction,
    loadedOk: characterBakedViewLoadedOkAction,
    keyFactory: (stage, characterBakedView) => characterBakedViewSelector(stage, characterBakedView.id)
});

export const characterBakedViewListPageSelector =
    (stage: string, params: CharacterBakedViewParams) => (appState: AppState) => {
        const result = appState.character.backedView.listPages[hashKeySelector(stage, params)];

        let data = result?.pages?.[pageKeySelector(params.skip, params.take)]
            ?.map((el) => appState.character.backedView.entities[el]!)
            .filter(Boolean);

        const pageSize = params.take ?? DEFAULT_CHARACTER_BAKED_VIEW_LIST_PAGE_SIZE;
        const currentPage = Math.floor((params.skip ?? 0) / pageSize) + 1;
        const total = calculateListTotal(data?.length ?? 0, params.skip, DEFAULT_CHARACTER_BAKED_VIEW_LIST_PAGE_SIZE);

        return {
            loading: result?.loading,
            error: result?.error,
            total,
            data,
            params,
            stage,
            pageSize,
            currentPage
        };
    };

export const characterBakedViewByIdSelector = (stage: string, id: number) => (appState: AppState) => {
    const info = characterBakedViewListPageSelector(stage, { id })(appState);

    const data = info.data?.[0];

    return {
        loading: info.loading ?? false,
        error: info.error,
        data
    };
};

export const bakedViewByCharacterIdSelector = (stage: string, characterId: number) => (appState: AppState) => {
    const info = characterBakedViewListPageSelector(stage, { characterId })(appState);

    const data = info.data?.[0];

    return {
        loading: info.loading ?? false,
        error: info.error,
        data
    };
};
