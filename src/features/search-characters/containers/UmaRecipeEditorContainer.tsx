import React, { useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";

import { CHARACTER_DETAILS_DNA_EDITOR_URL } from "urls";
import { characterDetailsSelector, updateUmaRecipeAction } from "features/search-characters/store";
import { LoadingContainer } from "shared";
import { UmaRecipeEditor } from "../components/UmaRecipeEditor";

export function UmaRecipeEditorContainer() {
    const location = useLocation();
    const dispatch = useDispatch();
    const urlMatch = CHARACTER_DETAILS_DNA_EDITOR_URL.match(location);

    if (!urlMatch.isMatched) {
        return <div></div>;
    }

    const { stage, id } = urlMatch.params;

    const info = useSelector(characterDetailsSelector(stage, id));

    const [editorError, setEditorError] = useState<string | undefined>();
    const [isHeaderVisible, setHeaderVisible] = useState(false);

    const parsedUmaRecipeJ = useMemo(() => {
        const j = info.data?.characterAndUmaRecipe[0].umaRecipe.j;

        return j ? parseUmaRecipeJToString(j) : undefined;
    }, [info.data]);

    const validateJSON = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
        try {
            JSON.parse(event.target.value);

            setEditorError(undefined);
        } catch (error) {
            const message = error instanceof Error ? error.message : "Unknown Error";

            setEditorError(message);
        }
    };

    const showSaveTitle = () => setHeaderVisible(true);
    const hideSaveTitle = () => setHeaderVisible(false);

    const handleSubmit = ({ umaRecipeJ }: { umaRecipeJ: string }) => {
        const parsedJ = parseUmaRecipeJToBase64(umaRecipeJ);

        const id = info.data?.characterAndUmaRecipe[0].umaRecipe.id;

        if (parsedJ && id) {
            dispatch(updateUmaRecipeAction({ stage, data: { id, j: parsedJ } }));
        }
        hideSaveTitle();
    };

    if (info.loading) {
        return <LoadingContainer loading />;
    }

    if (!parsedUmaRecipeJ) {
        return null;
    }

    return (
        <UmaRecipeEditor
            initialValue={{ umaRecipeJ: parsedUmaRecipeJ }}
            validateStatus={editorError ? "error" : "success"}
            isHeaderVisible={isHeaderVisible}
            editorError={editorError}
            handleSubmit={handleSubmit}
            onFieldsChange={showSaveTitle}
            onReset={hideSaveTitle}
            onBlur={validateJSON}
        />
    );
}

const parseUmaRecipeJToString = (value: string): string => {
    const parsedJ = JSON.parse(atob(value));

    if (parsedJ.dna) {
        const newDna = parsedJ.dna.map((dnaItem: { [key: string]: string }) => {
            try {
                dnaItem.packedDna = JSON.parse(dnaItem.packedDna);
            } finally {
                return dnaItem;
            }
        });

        return JSON.stringify({ ...parsedJ, dna: newDna }, undefined, 4);
    }

    return JSON.stringify(parsedJ, undefined, 4);
};

const parseUmaRecipeJToBase64 = (value: string): string => {
    const objectJ = JSON.parse(value);

    if (objectJ.dna) {
        const newDna = objectJ.dna.map((dnaItem: { [key: string]: string }) => {
            try {
                dnaItem.packedDna = JSON.stringify(dnaItem.packedDna);
            } finally {
                return dnaItem;
            }
        });

        return btoa(JSON.stringify({ ...objectJ, dna: newDna }));
    }

    return btoa(JSON.stringify(objectJ));
};
