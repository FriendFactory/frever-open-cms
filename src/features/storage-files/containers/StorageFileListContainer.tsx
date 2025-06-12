import React, { useCallback } from "react";
import { Button, List, message, Popconfirm, Result, theme, Upload } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router";
import styled from "styled-components";

import { STORAGE_FILE_LIST_URL } from "urls";
import { storageFileListPageSelector } from "../store/reducer/storageFileListPageReducer";
import { StorageFileImage } from "../components/StorageFileImage";
import { StorageFileFormContainer } from "./StorageFileFormContainer";
import { ColumnsLayout } from "layout";
import { StorageFile } from "../services";
import { storageFileDeleteAction, storageFilePostAction } from "../store/actions";
import { createAcceptAttribute, FileExtensions } from "config";

export interface StorageFileListContainerProps {}

export function StorageFileListContainer({}: StorageFileListContainerProps) {
    const dispatch = useDispatch();
    const location = useLocation();
    const urlMatch = STORAGE_FILE_LIST_URL.match(location);

    if (!urlMatch.isMatched) return <div></div>;

    const stage = urlMatch.params.stage;
    const params = urlMatch.query || {};

    const info = useSelector(storageFileListPageSelector(stage, params));

    const handleOnFinish = useCallback(
        ({ version, ...data }: StorageFile) =>
            ({ file }: any) => {
                if (file.type !== "image/png") {
                    message.error("File extension is not valid");
                    return;
                }
                dispatch(storageFilePostAction({ stage, data: { ...data, extension: FileExtensions.Png }, file }));
            },
        [info.data]
    );

    const handleOnDelete = useCallback(
        (id: number) => () => dispatch(storageFileDeleteAction({ stage, id })),
        [info.data]
    );

    if (info.error) return <Result status="error" title={info.error} />;
    return (
        <ColumnsLayout>
            <RightAligned>
                <StorageFileFormContainer />
            </RightAligned>
            <List
                loading={info.loading && !info.data}
                itemLayout="horizontal"
                dataSource={info.data}
                renderItem={(item) => (
                    <ListItemWrapper
                        actions={[
                            <Upload
                                key="update-image"
                                accept={createAcceptAttribute("png")}
                                showUploadList={false}
                                customRequest={handleOnFinish(item)}>
                                <Button type="link">Replace image</Button>
                            </Upload>,
                            <Popconfirm
                                title="Are you sure you want to delete this file?"
                                placement="left"
                                onConfirm={handleOnDelete(item.id)}
                                okText="Confirm"
                                okType="danger"
                                cancelText="Cancel">
                                <Button type="link" danger>
                                    Delete
                                </Button>
                            </Popconfirm>
                        ]}>
                        <List.Item.Meta avatar={<StorageFileImage value={item} />} title={item.key} />
                    </ListItemWrapper>
                )}
            />
        </ColumnsLayout>
    );
}

export const RightAligned = styled.div`
    margin-left: auto;
`;

export const ListItemWrapper = styled(List.Item)`
    @media (max-width: ${() => theme.useToken().token.screenSM}px) {
        .ant-list-item-action {
            flex: initial !important;
            margin-inline-start: 0 !important;
        }
        .ant-list-item-meta {
            flex-direction: column-reverse;
            align-items: center !important;
        }
        .ant-list-item-meta-content {
            width: auto !important;
        }
        li {
            padding: 0 !important;
        }
        em {
            display: none;
        }
    }
`;
