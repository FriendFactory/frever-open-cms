import { defineAction, defineActionGroup } from "rd-redux-utils";

import { ResultWithCount } from "shared";
import { CrewRewards, CrewRewardsQueryParams } from "../../services";

export const crewRewardsListActionGroup =
    defineActionGroup<{ stage: string; params: CrewRewardsQueryParams }>("CREWS REWARDS LIST");

export const crewRewardsListLoadingAction = crewRewardsListActionGroup.defineAction("LOADING");

export const crewRewardsListLoadedOkAction =
    crewRewardsListActionGroup.defineAction<{ result: ResultWithCount<CrewRewards> }>("LOADED OK");

export const crewRewardsListLoadedErrorAction =
    crewRewardsListActionGroup.defineAction<{ error: string }>("LOADED ERROR");

export const updateCrewRewardsList = defineAction<{ stage: string; data: CrewRewards }>("CREWS REWARDS LIST UPDATE");

export const postCrewRewardEntityAction = defineAction<{
    data: CrewRewards;
    thumbnail?: File;
}>("CREWS REWARDS LIST POST ENTITY");
