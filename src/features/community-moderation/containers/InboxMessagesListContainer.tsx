import React from "react";

import { COMMUNITY_CHAT_URL } from "urls";
import { InboxList } from "../components/InboxList/InboxList";
import { useInboxListSearch } from "../hooks/useInboxListSearch";

interface InboxMessagesListContainerProps {}

export function InboxMessagesListContainer({}: InboxMessagesListContainerProps) {
    const urlMatch = COMMUNITY_CHAT_URL.match(location);

    if (!urlMatch.isMatched) return null;

    const { info, pageChange, onSearch } = useInboxListSearch({
        stage: urlMatch.params.stage,
        baseParams: urlMatch.query ?? {}
    });

    return <InboxList info={info ?? []} pageChange={pageChange} onSearch={onSearch} />;
}
