import { Action } from "redux";

import {
    ExtraDataLoadedResult,
    extraDataActionGroup,
    extraDataLoadedAction,
    extraDataLoadingAction,
    updateExtraDataStateAction
} from "../actions";
import { ExtraDataName, ExtraDataType } from "shared/services/api";
import { AppState } from "app-state";

export type ExtraDataState<T extends ExtraDataName = ExtraDataName> = {
    [K in T]?: { loading: boolean; error?: string; data?: ExtraDataType<K>[] };
};

export const extraDataReducer = extraDataActionGroup.hashedReducer(
    (props) => props.stage,
    (state: ExtraDataState | undefined, action: Action): ExtraDataState => {
        if (!state) {
            state = {};
        }

        if (extraDataLoadingAction.is(action)) {
            return action.entities.reduce(
                <T extends ExtraDataName>(acc: ExtraDataState<T>, el: T) => {
                    acc[el] = { ...acc[el], error: undefined, loading: true };
                    return acc;
                },
                { ...state }
            );
        }

        if (extraDataLoadedAction.is(action)) {
            return action.result.reduce(
                <T extends ExtraDataName>(acc: ExtraDataState<T>, { name, error, data }: ExtraDataLoadedResult<T>) => {
                    acc[name] = { ...acc[name], loading: false, error, data };
                    return acc;
                },
                { ...state }
            );
        }

        if (updateExtraDataStateAction.is(action)) {
            let data: ExtraDataType[] = [...(state[action.entityName]?.data ?? [])];

            const command = action.command;
            if (command.type === "delete") data = data.filter((el) => el.id !== command.id);
            if (command.type === "add") data = [command.result, ...data];

            if (command.type === "update") {
                const { result } = command;
                if (Array.isArray(result)) {
                    data = data.map((el) => {
                        const match = result.find((item) => item.id === el.id);
                        return match ? match : el;
                    });
                } else {
                    data = data.map((el) => (el.id === result.id ? result : el));
                }
            }
            return {
                ...state,
                [action.entityName]: { ...state[action.entityName], data }
            };
        }

        return state;
    }
);

export interface ExtraDataResult<T extends ExtraDataName> {
    loading: boolean;
    error?: string;
    data?: ExtraDataType<T>[];
}

export function extraDataSelector<T extends ExtraDataName>(
    stage: string,
    entityName: T
): (appState: AppState) => ExtraDataResult<T> {
    return (appState) => {
        const extraDataState = appState.extraData[stage]?.[entityName];

        return {
            loading: extraDataState?.loading ?? false,
            error: extraDataState?.error ?? undefined,
            data: extraDataState?.data ?? undefined
        };
    };
}

export interface ExtraDataBundleResult<T extends ExtraDataName = ExtraDataName> {
    loading: boolean;
    bundle: {
        [Key in T]?: { data?: ExtraDataType<Key>[]; error?: string };
    };
}

export function extraDataBundleSelector<T extends ExtraDataName>(
    stage: string,
    names: T[]
): (appState: AppState) => ExtraDataBundleResult<T> {
    return (appState) => {
        const data = names.map((name) => {
            return { name, result: extraDataSelector(stage, name)(appState) };
        });

        const loading = data.some((el) => el.result.loading) ?? false;

        const bundle = data.reduce<ExtraDataBundleResult<T>["bundle"]>((acc, el) => {
            acc[el.name] = { data: el.result.data, error: el.result.error };
            return acc;
        }, {});

        return {
            loading,
            bundle
        };
    };
}

export function hashKeySelector(stage: string, entityName?: ExtraDataName): string {
    return `${stage}/${entityName}`;
}
