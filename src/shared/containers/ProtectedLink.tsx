import React, { useEffect, useState } from "react";
import axios from "axios";
import { checkUserAccess } from "shared/checkUserAccess";
import { Link, LinkProps } from "react-router-dom";
import { FeaturesTypes } from "config";

interface ProtectedLinkProps extends LinkProps {
    feature: FeaturesTypes;
}

export function ProtectedLink({ feature, children, ...linkProps }: ProtectedLinkProps) {
    const [hasAccess, setHasAccess] = useState<boolean>(false);

    useEffect(() => {
        let isMounted = true;
        const cancelTokenSource = axios.CancelToken.source();

        const fetchData = async () => {
            const response = await checkUserAccess(feature, cancelTokenSource.token);
            if (isMounted) {
                setHasAccess(response);
            }
        };

        if (!hasAccess) {
            fetchData();
        }

        return () => {
            isMounted = false;
            cancelTokenSource.cancel("Request canceled.");
        };
    }, [feature, hasAccess]);

    return hasAccess ? <Link {...linkProps}>{children}</Link> : <span>{children}</span>;
}
