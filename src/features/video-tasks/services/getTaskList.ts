import qs from "query-string";

import { request, ResultWithCount } from "shared";
import { dateToODataFormat } from "utils";
import { Task } from ".";
import { DEFAULT_TASK_LIST_SIZE } from "urls";

export interface TaskListQueryParams {
    skip?: number;
    take?: number;

    id?: number;
    name?: string;
    isDressed?: boolean;
    deletionAllowed?: boolean;
    createdTime?: string;
    modifiedTime?: string;
    readiness?: string | string[];
    taskType?: number;

    orderBy?: "id" | "name" | "sortOrder" | "createdTime" | "modifiedTime";
    sortDirection?: "asc" | "desc";
}

export async function getTaskList(stage: string, params: TaskListQueryParams): Promise<ResultWithCount<Task>> {
    const query: any = {
        $count: true,
        $skip: params.skip ?? 0,
        $top: params.take ?? DEFAULT_TASK_LIST_SIZE,
        $orderBy: `${params.orderBy ?? "id"} ${params.sortDirection ?? "desc"}`
    };

    const filter = [];

    if (params.id) filter.push(`id eq ${params.id}`);
    if (params.name) filter.push(`Contains(tolower(name), tolower('${params.name}'))`);

    if (params.readiness) {
        typeof params.readiness === "string"
            ? filter.push(`readinessId eq ${params.readiness}`)
            : filter.push(`readinessId in (${params.readiness})`);
    }

    if (params.createdTime) {
        const dates = dateToODataFormat(params.createdTime);
        if (dates) filter.push(`createdTime ge ${dates.start} and createdTime le ${dates.end}`);
    }

    if (params.modifiedTime) {
        const dates = dateToODataFormat(params.modifiedTime);
        if (dates) filter.push(`modifiedTime ge ${dates.start} and modifiedTime le ${dates.end}`);
    }

    if (params.deletionAllowed) filter.push(`deletionAllowed eq ${params.deletionAllowed}`);
    if (params.isDressed) filter.push(`isDressed eq ${params.isDressed}`);

    if (params.taskType) query.type = params.taskType;

    if (filter.length) query.$filter = filter.join(" and ");

    const response = await request(stage)
        .assetmanager()
        .get(`api/task?${qs.stringify(query)}`);

    if (response.status === 200) return response.data;

    throw new Error(`Status code: ${response.status}.`);
}
