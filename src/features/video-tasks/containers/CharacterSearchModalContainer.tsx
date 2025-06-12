import React from "react";
import { Pagination, Row, Col, Card, Avatar } from "antd";
import Meta from "antd/lib/card/Meta";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "antd/es/form/Form";

import { DEFAULT_CHARACTER_LIST_PAGE_SIZE } from "urls";
import { LoadingContainer, createCdnURLFromFiles } from "shared";
import { useExtraData } from "shared/hooks/useExtraData";
import { ScrollableModal } from "shared/components/ScrollableModal";
import {
    CharacterFilterFormParams,
    CharacterListFilterForm
} from "features/search-characters/components/CharacterListFilterForm";
import { characterListPageSelector, characterListLoadAction } from "features/search-characters/store";
import { toCharacterFormValues, toCharacterUrlParams } from "features/search-characters/containers";
import { Character } from "features/user-moderation/services";
import { GetCharacterListParams } from "features/search-characters/services";

// Task level event can be replaced by the public characters (which have IsDeleted == false and GroupId != 1 and  ReadinessId == 2 and  PublicForBackgroundDancing == true)
const requiredCharacterParams: GetCharacterListParams = {
    publicForBackgroundDancing: "true",
    ignoreGroupId: 1,
    readinessId: 2,
    isDeleted: "false"
};

export interface CharacterSearchModalContainerProps {
    stage: string;
    children: React.ReactNode;
    onCharacterClick: (value: Character) => void;
}

export function CharacterSearchModalContainer({
    stage,
    children,
    onCharacterClick
}: CharacterSearchModalContainerProps) {
    const dispatch = useDispatch();
    const gender = useExtraData({ stage: stage, name: "Gender" });
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchParams, setSearchParams] = useState<GetCharacterListParams>({});
    const [form] = useForm<CharacterFilterFormParams>();
    const characterList = useSelector(characterListPageSelector(stage, searchParams));

    const handleOnChange = async () => {
        const formParams = await form.validateFields();
        const params: GetCharacterListParams = {
            ...toCharacterUrlParams(formParams),
            ...requiredCharacterParams,
            skip: 0
        };
        dispatch(characterListLoadAction({ stage, params }));
        setSearchParams(params);
    };

    const handleOnPage = (page: number) => {
        const skip = (page - 1) * DEFAULT_CHARACTER_LIST_PAGE_SIZE;
        const params: GetCharacterListParams = { ...searchParams, ...requiredCharacterParams, skip };
        dispatch(characterListLoadAction({ stage, params }));
        setSearchParams(params);
    };

    const showCharacterModal = () => {
        setIsModalOpen(true);
        handleOnChange();
    };

    return (
        <>
            <a onClick={showCharacterModal}>{children}</a>
            <ScrollableModal
                title="Search for templates (Click on a template to select)"
                open={isModalOpen}
                width={1300}
                onCancel={() => setIsModalOpen(false)}
                footer={
                    <Pagination
                        showQuickJumper
                        showSizeChanger={false}
                        total={characterList.total}
                        current={characterList.currentPage}
                        onChange={handleOnPage}
                    />
                }>
                <CharacterListFilterForm
                    form={form}
                    values={toCharacterFormValues(searchParams)}
                    onSearch={handleOnChange}
                />
                {characterList.loading && <LoadingContainer loading />}
                <Row gutter={[10, 10]}>
                    {characterList.data?.map((character) => (
                        <Col
                            key={character.id}
                            flex="200px"
                            onClick={() => {
                                onCharacterClick(character);
                                setIsModalOpen(false);
                            }}>
                            <Card
                                style={{ width: 200 }}
                                hoverable
                                cover={
                                    <Avatar
                                        size={200}
                                        shape="square"
                                        src={createCdnURLFromFiles({
                                            id: character.id,
                                            files: character.files,
                                            stage,
                                            entityType: "character",
                                            resolution: "256x256"
                                        })}
                                    />
                                }>
                                <Meta
                                    title={"ID: " + character.id}
                                    description={
                                        <span>
                                            {gender.data?.find((el) => el.id === character.genderId)?.name}
                                            <br />
                                            Group: {character.groupId}
                                        </span>
                                    }
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
            </ScrollableModal>
        </>
    );
}
