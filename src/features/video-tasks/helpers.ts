import { taskType } from "./constants";

export const checkIsTaskVotingType = (taskTypeId?: number) =>
    taskTypeId === taskType.find((el) => el.name === "Voting")?.id;
