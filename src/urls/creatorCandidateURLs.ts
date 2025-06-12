import { BASE_PAGE_URL } from "urls";
import { CreatorCandidatesQueryParams } from "features/creator-candidates/services";

export const CREATOR_CANDIDATE_BASE_URL = BASE_PAGE_URL.createChildPath("star-creator-candidates");

export const CREATOR_CANDIDATE_LIST_URL = CREATOR_CANDIDATE_BASE_URL.createChildPath<{}, CreatorCandidatesQueryParams>(
    "list"
);

export const CREATOR_CANDIDATE_LIST_BASE_PAGE_SIZE = 50;
