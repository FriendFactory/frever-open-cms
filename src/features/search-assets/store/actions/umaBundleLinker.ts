import { defineAction } from "rd-redux-utils";

import { UmaBundle } from "features/search-assets/services";

export const setBaseBundleToLinkerAction = defineAction<{ data: UmaBundle }>("SET BASE BUNDLE LINKER");

export const setVersionBundleToLinkerAction = defineAction<{ data: UmaBundle }>("SET VERSION BUNDLE LINKER");

export const clearLinkerAction = defineAction("CLEAR LINKER");

export const bindUmaBundlesAction =
    defineAction<{ stage: string; baseBundleId: number; versionBundleId: number; operation: "bind" | "unbind" }>(
        "BIND UMA BUNDLES"
    );
