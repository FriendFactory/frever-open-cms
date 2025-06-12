import React, { useEffect, useState } from "react";
import { useForm } from "antd/es/form/Form";
import { Button, Form } from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";

import { ScrollableModal, useCurrentStage } from "shared";
import { CreatePageRowInfoForm } from "../components/CreatePageRowInfoForm";
import { upsertSingleCreatePageRowAction } from "../store/actions";
import { CreatePageContentTypes, CreatePageRow, CreatePageRowContentShortInfo } from "../services";
import { SongSearchModalContainer } from "./SearchContent/SongSearchModalContainer";
import { CreatePageRowContentList } from "../components/RowContent/CreatePageRowContentList";
import { transformCreatePageRowContent } from "../helpers";
import { TemplateSearchModalContainer } from "./SearchContent/TemplateSearchModalContainer";
import { HashtagSearchModalContainer } from "./SearchContent/HashtagSearchModalContainer";
import { VideoSearchModalContainer } from "./SearchContent/VideoSearchModalContainer";

type FormCommand =
    | { type: "add"; data: CreatePageRowContentShortInfo[] }
    | { type: "replace"; data: CreatePageRowContentShortInfo[] }
    | { type: "remove"; ids: number[] };

export function AddCreatePageRowContainer() {
    const stage = useCurrentStage();
    const dispatch = useDispatch();

    const [form] = useForm<CreatePageRow>();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

    const watchContentType = Form.useWatch("contentType", form);
    const watchContentQuery = Form.useWatch("contentQuery", form);

    useEffect(() => {
        form.resetFields(["content"]);
    }, [watchContentType, watchContentQuery]);

    const showModal = () => setIsModalOpen(true);

    const discard = () => {
        setIsModalOpen(false);
        form.resetFields();
    };

    const handleOnFinish = async () => {
        const item = await form.validateFields();

        dispatch(upsertSingleCreatePageRowAction({ stage, data: transformCreatePageRowContent(item) }));

        setIsModalOpen(false);
    };

    return (
        <>
            <Button type="primary" ghost icon={<PlusOutlined />} onClick={showModal} />

            <ScrollableModal title="Add Row" open={isModalOpen} onOk={handleOnFinish} onCancel={discard} destroyOnClose>
                <CreatePageRowInfoForm form={form} />

                <Form form={form} layout="vertical">
                    <Form.Item shouldUpdate>
                        {({ getFieldValue, setFields }) => {
                            const contents: CreatePageRowContentShortInfo[] = getFieldValue("content") || [];
                            const contentType: string = getFieldValue("contentType");
                            const contentQuery: string = getFieldValue("contentQuery");

                            const formCommand = (command: FormCommand) => {
                                let value;

                                if (command.type === "add") value = [...contents, ...command.data];
                                if (command.type === "replace") value = [...command.data];
                                if (command.type === "remove")
                                    value = contents.filter((el) => !command.ids.some((id) => el.id === id));

                                setFields([
                                    {
                                        name: "content",
                                        errors: undefined,
                                        value
                                    }
                                ]);
                            };

                            const isLinked = (id: number) =>
                                !!contents.find((el: CreatePageRowContentShortInfo) => el.id === id);

                            if (!contentType || contentQuery) return null;
                            return (
                                <>
                                    <Form.Item
                                        label="Content list"
                                        name="content"
                                        rules={[{ required: true, message: "Please select at least one content" }]}>
                                        <CreatePageRowContentList
                                            stage={stage}
                                            contentType={contentType}
                                            contents={contents}
                                            onUpdate={(data) => formCommand({ type: "replace", data })}
                                            onDelete={(id) => formCommand({ type: "remove", ids: [id] })}
                                        />
                                    </Form.Item>
                                    {contentType === "songs" && (
                                        <SongSearchModalContainer
                                            isLinked={isLinked}
                                            bulkUpdate={(type, data) =>
                                                formCommand(
                                                    type === "add"
                                                        ? { type, data }
                                                        : { type, ids: data.map((el) => el.id) }
                                                )
                                            }
                                            changeStatusOfLinking={(item) =>
                                                formCommand(
                                                    isLinked(item.id)
                                                        ? { type: "remove", ids: [item.id] }
                                                        : { type: "add", data: [item] }
                                                )
                                            }
                                        />
                                    )}
                                    {contentType === CreatePageContentTypes["Template"] && (
                                        <TemplateSearchModalContainer
                                            isLinked={isLinked}
                                            bulkUpdate={(type, data) =>
                                                formCommand(
                                                    type === "add"
                                                        ? { type, data }
                                                        : { type, ids: data.map((el) => el.id) }
                                                )
                                            }
                                            changeStatusOfLinking={(item) =>
                                                formCommand(
                                                    isLinked(item.id)
                                                        ? { type: "remove", ids: [item.id] }
                                                        : { type: "add", data: [item] }
                                                )
                                            }
                                        />
                                    )}
                                    {contentType === CreatePageContentTypes["Hashtag"] && (
                                        <HashtagSearchModalContainer
                                            isLinked={isLinked}
                                            bulkUpdate={(type, data) =>
                                                formCommand(
                                                    type === "add"
                                                        ? { type, data }
                                                        : { type, ids: data.map((el) => el.id) }
                                                )
                                            }
                                            changeStatusOfLinking={(item) =>
                                                formCommand(
                                                    isLinked(item.id)
                                                        ? { type: "remove", ids: [item.id] }
                                                        : { type: "add", data: [item] }
                                                )
                                            }
                                        />
                                    )}
                                    {contentType === CreatePageContentTypes["Video"] && (
                                        <VideoSearchModalContainer
                                            isLinked={isLinked}
                                            bulkUpdate={(type, data) =>
                                                formCommand(
                                                    type === "add"
                                                        ? { type, data }
                                                        : { type, ids: data.map((el) => el.id) }
                                                )
                                            }
                                            changeStatusOfLinking={(item) =>
                                                formCommand(
                                                    isLinked(item.id)
                                                        ? { type: "remove", ids: [item.id] }
                                                        : { type: "add", data: [item] }
                                                )
                                            }
                                        />
                                    )}
                                </>
                            );
                        }}
                    </Form.Item>
                </Form>
            </ScrollableModal>
        </>
    );
}
