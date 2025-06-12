import { Action } from "redux";

import { Hashtag } from "features/hashtag-moderation/services";
import { hashtagListLoadedOkAction, updateHashtagOkAction, updateSortOrderOkAction } from "../actions";
import { AppState } from "app-state";

export interface HashtagsEntitiesState {
    [key: string]: Hashtag;
}

export const hashtagsEntitiesReducer = (
    state: HashtagsEntitiesState | undefined,
    action: Action
): HashtagsEntitiesState => {
    if (!state) {
        state = {};
    }

    if (hashtagListLoadedOkAction.is(action)) {
        return { ...state, ...createHashtagsWithKey(action.result.data, action.stage) };
    }

    if (updateHashtagOkAction.is(action)) {
        return {
            ...state,
            [hashtagKeySelector(action.stage, action.result.id)]: action.result
        };
    }

    if (updateSortOrderOkAction.is(action)) {
        return { ...state, ...createHashtagsWithKey(action.result, action.stage) };
    }

    return state;
};

function createHashtagsWithKey(data: Hashtag[], stage: string): HashtagsEntitiesState {
    return data.reduce((accumulator: { [key: string]: Hashtag }, hashtag) => {
        accumulator[hashtagKeySelector(stage, hashtag.id)] = hashtag;
        return accumulator;
    }, {});
}

export const hashtagKeySelector = (stage: string, id: number): string => `${stage}/${id}`;

export function hashtagByNameSelector(stage: string, name: string): (appState: AppState) => Hashtag | undefined {
    return (appState) => {
        const hashtag = Object.entries(appState.hashtag.entities).find(
            ([key, entity]) => key.startsWith(stage) && entity.name === name
        )?.[1];

        return hashtag;
    };
}
