import { Store } from "antd/lib/form/interface";
import { defineAction, defineActionGroup } from "rd-redux-utils";

import { ExtraDataName, ExtraDataType } from "shared/services/api";

export type ExtraDataLoadedResult<T extends ExtraDataName> = {
    name: T;
    data?: ExtraDataType<T>;
    error?: string;
};

type ExtraDataUpdateStateCommand =
    | {
          type: "delete";
          id: number;
      }
    | {
          type: "update";
          result: ExtraDataType | ExtraDataType[];
      }
    | {
          type: "add";
          result: ExtraDataType;
      };

export const extraDataActionGroup = defineActionGroup<{ stage: string }>("EXTRA DATA");

export const extraDataLoadAction = extraDataActionGroup.defineAction<{ entities: ExtraDataName[] }>("LOAD");

export const extraDataLoadingAction =
    extraDataActionGroup.defineAction<{ entities: ExtraDataName[] }>("EXTRA DATA: LOADING");

export const extraDataLoadedAction =
    extraDataActionGroup.defineAction<{ result: ExtraDataLoadedResult<ExtraDataName>[] }>("EXTRA DATA: LOADED");

export const updateEntityAction = defineAction<{
    stage: string;
    entityName: ExtraDataName;
    data: any;
    withListUpdate?: boolean;
}>("EXTRA DATA: UPDATE ENTITY");

export const createEntityAction = defineAction<{
    stage: string;
    entityName: ExtraDataName;
    data: Store;
}>("EXTRA DATA: CREATE ENTITY");

export const deleteEntityAction = defineAction<{
    stage: string;
    entityName: ExtraDataName;
    entityId: number;
}>("EXTRA DATA: DELETE ENTITY");

export const updateExtraDataStateAction = defineAction<{
    stage: string;
    entityName: ExtraDataName;
    command: ExtraDataUpdateStateCommand;
}>("EXTRA DATA UPDATE STATE");
