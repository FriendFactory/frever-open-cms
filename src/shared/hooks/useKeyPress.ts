import { useCallback, useEffect, useLayoutEffect, useRef } from "react";

export const useKeyPress = (keys: string[], callback: Function, node?: Element) => {
    // implement the callback ref pattern
    const callbackRef = useRef(callback);

    useLayoutEffect(() => {
        callbackRef.current = callback;
    });

    // handle what happens on key press
    const handleKeyPress = useCallback(
        (event: any) => {
            // check if one of the key is part of the ones we want
            if (keys.some((key) => event.key === key)) {
                callbackRef.current(event);
            }
        },
        [keys]
    );

    useEffect(() => {
        // target is either the provided node or the document
        const targetNode = node ?? document;
        // attach the event listener
        targetNode && targetNode.addEventListener("keydown", handleKeyPress);

        // remove the event listener
        return () => targetNode && targetNode.removeEventListener("keydown", handleKeyPress);
    }, [handleKeyPress, node]);
};
