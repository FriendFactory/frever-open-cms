import { AdminAccessScope } from "features/permission-moderation/services";
import { defineAction } from "rd-redux-utils";

export const updateSideMenuParamsAction =
    defineAction<{ accessScope: AdminAccessScope[]; selectedKeys: string[]; stage: string }>("UPDATE SIDE MENU PARAMS");

export const updateSideMenuCurrentEnvAction = defineAction<{ stage: string }>("UPDATE SIDE MENU CURRENT ENV");
