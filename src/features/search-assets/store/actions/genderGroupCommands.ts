import { defineAction } from "rd-redux-utils";

export const executeGenderGroupCommandAction = defineAction<{
    stage: string;
    command:
        | { type: "join-to-group"; wardrobeId: number; genderGroupId?: number }
        | { type: "exit-from-group"; wardrobeId: number; genderGroupId?: number };
}>("EXECUTE GENDER GROUP COMMAND");
