import { useEffect, useState } from "react";
import { USER_SEARCH_DEFAULT_SIZE, UserGroupShortInfo, getUsers } from "./getUsers";
import { useCurrentStage } from "shared/hooks";
import { useDebounce } from "shared/hooks/useDebounce";

interface SearchParams {
    input?: string;
    skip: number;
}

interface UserSearchResult {
    loading: boolean;
    data?: UserGroupShortInfo[];
    error?: string;
}

export const useUserSearch = (input?: string) => {
    const stage = useCurrentStage();

    const [info, setInfo] = useState<UserSearchResult>({ loading: false });

    const [search, setSearch] = useState<SearchParams>({ input, skip: 0 });

    const debouncedSearchTerm = useDebounce(search, 500);

    const onSearch = (newSearch: string) => setSearch({ skip: 0, input: newSearch });
    const showMore = () => setSearch({ ...search, skip: search.skip + USER_SEARCH_DEFAULT_SIZE });

    useEffect(() => {
        (async () => {
            if (debouncedSearchTerm.input) {
                setInfo({ ...info, loading: true });

                const result = await getUsers(stage, debouncedSearchTerm.input, debouncedSearchTerm.skip);

                if (search.skip > 0 && "data" in result && info.data?.length) {
                    result.data = [...info.data, ...result.data];
                }

                setInfo({ ...result, loading: false });
            } else {
                setInfo({ loading: false });
            }
        })();
    }, [debouncedSearchTerm]);

    const isShowMoreAvailable = !!info.data?.length && info.data.length % USER_SEARCH_DEFAULT_SIZE === 0;

    return { info, onSearch, showMore, isShowMoreAvailable };
};
