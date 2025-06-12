import { defineAction, defineActionGroup } from "rd-redux-utils";

import { CreatorCandidatesQueryParams } from "features/creator-candidates/services";
import { StarCreatorCandidate } from "features/creator-candidates/services/api";

export type CreatorCandidateCommand =
    | {
          type: "create";
          emails: string[];
      }
    | {
          type: "update";
          entityId: number;
          data: Partial<StarCreatorCandidate>;
      }
    | {
          type: "delete";
          entityId: number;
      };

export const creatorCandidateListActionGroup = defineActionGroup<{
    stage: string;
    params: CreatorCandidatesQueryParams;
}>("START CREATOR CANDIDATE LIST");

export const creatorCandidateListLoadingAction = creatorCandidateListActionGroup.defineAction("LOADING");

export const creatorCandidateListLoadedOkAction = creatorCandidateListActionGroup.defineAction<{
    result: StarCreatorCandidate[];
}>("LOADED OK");

export const creatorCandidateListLoadedErrorAction = creatorCandidateListActionGroup.defineAction<{
    error: string;
}>("LOADED ERROR");

export const executeCreatorCandidateCommandAction = defineAction<{
    stage: string;
    command: CreatorCandidateCommand;
}>("EXECUTE START CREATOR CANDIDATE COMMAN");

export const updateCreatorCandidateAction = defineAction<{
    stage: string;
    id: number;
    result: StarCreatorCandidate | undefined;
}>("UPDATE START CREATOR CANDIDATE");
