import { defineAction } from "rd-redux-utils";

import { BlockOperation, DeleteOperation, EditUserContactData, Group, User } from "../../services";

export const updateUserDataAction = defineAction<{
    stage: string;
    id: number;
    data: Partial<User>;
}>("UPDATE USER DETAILS");

export const updateUserDataOkAction = defineAction<{
    stage: string;
    id: number;
    result: Partial<User>;
}>("UPDATE USER DETAILS OK");

export const updateUserGroupDataAction = defineAction<{
    stage: string;
    groupId: number;
    data: Partial<Group>;
}>("UPDATE USER GROUP DETAILS");

export const userBlockAction =
    defineAction<{ stage: string; groupId: number; operation: BlockOperation }>("BLOCK USER");

export const softDeleteUserAction = defineAction<{
    stage: string;
    groupId: number;
    operation: DeleteOperation;
}>("SOFT DELETE USER");

export const hardDeleteUserAction = defineAction<{
    stage: string;
    user: User;
}>("HARD DELETE USER");

export const updateUserContactDataAction =
    defineAction<{ stage: string; id: number; data: EditUserContactData }>("UPDATE USER CONTACT DATA");

export const updateUserGroupDataOkAction = defineAction<{
    stage: string;
    groupId: number;
    result: Partial<Group>;
}>("UPDATE USER GROUP DETAILS OK");
