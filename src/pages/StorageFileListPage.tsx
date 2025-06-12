import React from "react";

import { STORAGE_FILE_LIST_URL, DEFAULT_STORAGE_LIST_SIZE } from "urls";
import { StageSwitchTabsContainer, PageHeader, ListPagerContainer } from "shared";
import { SideMenuLayout, ListLayoutFragment, ContentWithHeaderFragment } from "layout";
import { StorageFileListContainer, storageFileListPagerSelector } from "features/storage-files";

function StorageFileListPage() {
    return (
        <SideMenuLayout>
            <ContentWithHeaderFragment>
                <PageHeader title="Storage Files" />
                <StageSwitchTabsContainer url={STORAGE_FILE_LIST_URL}>
                    <ListLayoutFragment>
                        <div></div>
                        <StorageFileListContainer />
                        <ListPagerContainer
                            url={STORAGE_FILE_LIST_URL}
                            selectorFactory={storageFileListPagerSelector}
                            defaultPageSize={DEFAULT_STORAGE_LIST_SIZE}
                        />
                    </ListLayoutFragment>
                </StageSwitchTabsContainer>
            </ContentWithHeaderFragment>
        </SideMenuLayout>
    );
}

export default StorageFileListPage;
