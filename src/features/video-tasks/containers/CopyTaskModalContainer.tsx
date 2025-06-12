import React, { useState } from "react";
import { Button, Card, Col, Pagination, Row, Typography } from "antd";
import Meta from "antd/lib/card/Meta";
import { useDispatch, useSelector } from "react-redux";

import { createCdnURLFromFiles, LoadingContainer } from "shared";
import { ScrollableModal } from "shared/components/ScrollableModal";
import { TaskListFilterForm, TaskListFilterParams } from "../components/TaskListFilterForm";
import { TaskVideoCard } from "../components/TaskVideoCard";
import { Task } from "../services";
import { copyTaskAssetsAction, taskListLoadAction } from "../store/actions";
import { taskListPageSelector } from "../store/reducer/taskList.reducer";
import { DEFAULT_TASK_LIST_SIZE } from "urls";
import { toTaskFormValues, toTaskUrlParams } from "./TaskListFilterFormContainer";

export interface CopyTaskModalContainerProps {
    stage: string;
    task: Task;
}

export function CopyTaskModalContainer({ stage, task }: CopyTaskModalContainerProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [searchParams, setSearchParams] = useState({});
    const dispatch = useDispatch();

    const taskList = useSelector(taskListPageSelector(stage, searchParams));

    const destroyModal = () => setIsModalOpen(false);
    const showModal = () => {
        handleOnChange({});
        setIsModalOpen(true);
    };

    const handleOnClick = (copyFromTaskId: number) => () => {
        dispatch(
            copyTaskAssetsAction({
                stage,
                copyFromTaskId,
                targerTaskId: task.id
            })
        );
        destroyModal();
    };

    const handleOnChange = (newValues: TaskListFilterParams) => {
        const params = { ...toTaskFormValues(newValues), skip: 0 };
        dispatch(taskListLoadAction({ stage, params }));
        setSearchParams(params);
    };

    const handleOnPage = (page: number) => {
        const skip = (page - 1) * DEFAULT_TASK_LIST_SIZE;
        const params = { ...toTaskFormValues(searchParams), skip };
        dispatch(taskListLoadAction({ stage, params }));
        setSearchParams(params);
    };

    return (
        <>
            <Button onClick={showModal}>Copy from ...</Button>
            <ScrollableModal
                title="Copy from other task"
                open={isModalOpen}
                destroyOnClose
                width={1360}
                maskClosable={false}
                onCancel={destroyModal}
                onOk={destroyModal}
                okType="primary"
                okText="Create"
                footer={
                    <Pagination
                        showQuickJumper
                        showSizeChanger={false}
                        total={taskList.total}
                        current={taskList.currentPage}
                        onChange={handleOnPage}
                    />
                }>
                <TaskListFilterForm stage={stage} value={toTaskUrlParams(searchParams)} onChange={handleOnChange} />
                <Row gutter={[10, 10]} align="bottom" justify="center">
                    {taskList.data?.map((task) => (
                        <Col key={task.id}>
                            <Card
                                onClick={handleOnClick(task.id)}
                                style={{ width: 220 }}
                                hoverable
                                cover={
                                    <TaskVideoCard
                                        width={220}
                                        height="auto"
                                        thumbnailUrl={createCdnURLFromFiles({
                                            stage,
                                            entityType: "SchoolTask",
                                            id: task.id,
                                            files: task.files,
                                            resolution: "512x512"
                                        })}
                                    />
                                }>
                                <Meta
                                    title={`ID: ${task.id}`}
                                    description={
                                        <Typography.Text style={{ width: "auto" }} ellipsis={{ tooltip: task.name }}>
                                            {task.name}
                                        </Typography.Text>
                                    }
                                />
                            </Card>
                        </Col>
                    ))}
                </Row>
                {taskList.loading && <LoadingContainer loading />}
            </ScrollableModal>
        </>
    );
}
