import { Store } from "antd/lib/form/interface";
import { defineAction } from "rd-redux-utils";

export const createTemplateAction = defineAction<{
    stage: string;
    data: Store;
}>("CREATE NEW TEMPLATE");
