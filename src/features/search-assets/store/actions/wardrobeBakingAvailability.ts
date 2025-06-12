import { defineAction } from "rd-redux-utils";

import { WardrobeBakingAvailability } from "features/search-assets/services";

export const updateWardrobeBakingAvailabilityAction = defineAction<{ stage: string; data: WardrobeBakingAvailability }>(
    "UPDATE WARDROBE BAKING AVAILABILITY"
);
