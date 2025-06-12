import * as qs from "query-string";
import { Action } from "redux";

import { PagingInfoSelectResult } from "shared";
import { AppState } from "app-state";
import {
    characterListActionGroup,
    characterListLoadingAction,
    characterListLoadedOkAction,
    characterListLoadedErrorAction
} from "../actions";
import { GetCharacterListParams } from "features/search-characters/services";
import { Character } from "features/user-moderation/services";
import { characterKeySelector } from "./character.reducer";
import { calculateListTotal } from "shared/calculate-list-total";
import { DEFAULT_CHARACTER_LIST_PAGE_SIZE } from "urls";

export interface CharacterListState {
    loading: boolean;
    error?: string;
    pages: {
        [pageKey: string]: string[];
    };
}

export const characterListReducer = characterListActionGroup.hashedReducer(
    (props) => hashKeySelector(props.stage, props.params),
    (state: CharacterListState | undefined, action: Action): CharacterListState => {
        if (!state) {
            state = {
                loading: false,
                pages: {},
                error: undefined
            };
        }

        if (characterListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true
            };
        }

        if (characterListLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (characterListLoadedOkAction.is(action)) {
            const ids = action.result.map((task) => characterKeySelector(action.stage, task.id));
            return {
                ...state,
                loading: false,
                pages: {
                    ...state.pages,
                    [pageKeySelector(action.params.skip)]: ids
                },
                error: undefined
            };
        }

        return state;
    }
);

export interface CharacterListPageResult extends PagingInfoSelectResult {
    loading: boolean;
    error?: string;
    data?: Character[];
    stage: string;
    params: GetCharacterListParams;
}

export function characterListPageSelector(
    stage: string,
    params: GetCharacterListParams
): (appState: AppState) => CharacterListPageResult {
    return (appState) => {
        const characterListPages = appState.character.listPages[hashKeySelector(stage, params)];
        const entities = appState.character.entities;
        const page = characterListPages?.pages[pageKeySelector(params.skip)];
        const data = page?.map((el) => entities[el]).filter(Boolean);

        const currentPage = Math.floor((params.skip ?? 0) / DEFAULT_CHARACTER_LIST_PAGE_SIZE) + 1;

        return {
            loading: characterListPages?.loading ?? false,
            data,
            params,
            total: calculateListTotal(page?.length ?? 0, params.skip, DEFAULT_CHARACTER_LIST_PAGE_SIZE),
            stage,
            error: characterListPages?.error,
            pageSize: DEFAULT_CHARACTER_LIST_PAGE_SIZE,
            currentPage
        };
    };
}

function hashKeySelector(stage: string, params: GetCharacterListParams): string {
    const { skip, ...keyParams } = params || {};

    return `${stage}/${qs.stringify((keyParams as any) ?? {})}`;
}

function pageKeySelector(skip: number | undefined): string {
    return `skip = ${skip ?? 0}`;
}
