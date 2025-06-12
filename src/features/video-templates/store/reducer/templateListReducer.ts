import * as qs from "query-string";
import { Action } from "redux";

import { PagingInfoSelectResult } from "shared";
import { AppState } from "app-state";
import { Template, TemplateFilterParams } from "../../services";
import { DEFAULT_TEMPLATE_LIST_PAGE_SIZE } from "urls";
import {
    templateListActionGroup,
    templateListLoadingAction,
    templateListLoadedOkAction,
    templateListLoadedErrorAction
} from "../actions";
import { pageKeySelector } from "utils";
import { templateKeySelector } from "./templateEntitiesReducer";

export interface TemplateListState {
    loading: boolean;
    error?: string;
    total: number;
    pages: { [pageKey: string]: string[] };
}
export const templateListReducer = templateListActionGroup.hashedReducer(
    (props) => hashKeySelector(props.stage, props.params),
    (state: TemplateListState | undefined, action: Action): TemplateListState => {
        if (!state) {
            state = {
                loading: false,
                pages: {},
                total: 0,
                error: undefined
            };
        }

        if (templateListLoadingAction.is(action)) {
            return {
                ...state,
                loading: true
            };
        }

        if (templateListLoadedErrorAction.is(action)) {
            return {
                ...state,
                loading: false,
                error: action.error
            };
        }

        if (templateListLoadedOkAction.is(action)) {
            return {
                ...state,
                loading: false,
                total: action.result.count,
                pages: {
                    ...state.pages,
                    [pageKeySelector(action.params.skip)]: action.result.data.map((el) =>
                        templateKeySelector(action.stage, el.id)
                    )
                },
                error: undefined
            };
        }

        return state;
    }
);

export interface TemplateListPageResult extends PagingInfoSelectResult {
    loading: boolean;
    error?: string;
    data?: Template[];
    stage: string;
    params: TemplateFilterParams;
}

export function templateListPageSelector(
    stage: string,
    params: TemplateFilterParams
): (appState: AppState) => TemplateListPageResult {
    return (appState) => {
        const templateState = appState.template.list[hashKeySelector(stage, params)];
        const data = templateState?.pages[pageKeySelector(params.skip)]
            ?.map((el) => appState.template.entities[el]!)
            .filter(Boolean);

        const currentPage = Math.floor((params.skip ?? 0) / DEFAULT_TEMPLATE_LIST_PAGE_SIZE) + 1;

        return {
            loading: templateState?.loading ?? false,
            total: templateState?.total ?? 0,
            error: templateState?.error,
            pageSize: DEFAULT_TEMPLATE_LIST_PAGE_SIZE,
            data,
            params,
            stage,
            currentPage
        };
    };
}

function hashKeySelector(stage: string, params: TemplateFilterParams): string {
    const { skip, ...keyParams } = params || {};

    return `${stage}/${qs.stringify((keyParams as any) ?? {})}`;
}
