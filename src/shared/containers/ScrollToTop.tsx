import React, { Fragment, useEffect } from "react";
import { useHistory } from "react-router";

export function ScrollToTop({ children }: { children: React.ReactNode }) {
    const history = useHistory();

    useEffect(() => {
        const unlisten = history.listen(() => {
            window.scrollTo(0, 0);
        });
        return () => {
            unlisten();
        };
    }, []);

    return <Fragment>{children}</Fragment>;
}
