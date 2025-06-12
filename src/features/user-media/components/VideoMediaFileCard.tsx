import React from "react";
import { Card } from "antd";
import styled from "styled-components";

export interface VideoMediaFileCardProps {
    loading: boolean;
    url?: string;
    extra?: React.ReactNode;
}

export function VideoMediaFileCard({ loading, url, extra }: VideoMediaFileCardProps) {
    return (
        <Card title="Media file" loading={loading} extra={extra}>
            {url && <Video src={url} controls />}
        </Card>
    );
}

const Video = styled.video`
    width: 100%;
`;
