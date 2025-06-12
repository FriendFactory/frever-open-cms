import { defineAction } from "rd-redux-utils";

import { CurrencySupply, UserProfileKPI } from "features/user-moderation/services";

export const boostUserStatsAction = defineAction<{
    stage: string;
    command:
        | {
              type: "Currency";
              value: CurrencySupply;
          }
        | {
              type: "Xp";
              groupId: number;
              value: number;
          };
}>("BOOST USER STATS");

export const updateUserSocialProfieAction =
    defineAction<{ stage: string; groupId: number; result: UserProfileKPI }>("UPDATE USER SOCIAL PROFILE");
