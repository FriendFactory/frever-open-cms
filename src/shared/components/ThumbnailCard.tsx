import React from "react";
import { Image, Upload, Button, ImageProps, theme } from "antd";
import styled from "styled-components";
import { FileType } from "./UploadImage";

export interface ThumbnailCardProps extends ImageProps {
    imageUrl: string;
    accept?: FileType;
    markers?: React.ReactNode[];
    handleUpdate?: (file: any) => void;
    holderProps?: ThumbnailCardWrapperStyledProps;
    background?: string;
    borderRadius?: string;
    aspectRatio?: string;
    transform?: string;
    customUploadButton?: React.ReactNode;
}

export function ThumbnailCard({
    imageUrl,
    accept,
    markers,
    handleUpdate,
    background,
    borderRadius,
    width,
    height,
    holderProps,
    aspectRatio,
    transform,
    customUploadButton,
    ...restProps
}: ThumbnailCardProps) {
    const { token } = theme.useToken();
    return (
        <ThumbnailCardWrapper
            backgroundColor={token.colorBgContainer}
            imageBackground={background ?? token.colorBgContainer}
            borderRadius={borderRadius ?? token.borderRadius + "px"}
            height={height}
            width={width}
            textColor={token.colorTextBase}
            fontSize={token.fontSizeSM + "px"}
            aspectRatio={aspectRatio}
            transform={transform}
            textGap={token.paddingXXS + "px"}
            {...holderProps}>
            <div className="ThumbnailCard__inner">
                <Image
                    wrapperClassName="ThumbnailCard__image-wrapper"
                    src={imageUrl}
                    width={width}
                    height={height}
                    {...restProps}
                />
                <div className="ThumbnailCard__info-container">
                    <div className="ThumbnailCard__info-container-item top">
                        <div className="ThumbnailCard__info-container-item tag-list">
                            {markers?.map((el, i) => (
                                <div key={i} className="card-tag">
                                    {el}
                                </div>
                            ))}
                        </div>
                        {handleUpdate && (
                            <Upload
                                accept={accept}
                                showUploadList={false}
                                customRequest={({ file }) => {
                                    handleUpdate(file);
                                }}>
                                {customUploadButton ?? (
                                    <Button size="small" ghost type="primary" className="card-tag">
                                        Replace
                                    </Button>
                                )}
                            </Upload>
                        )}
                    </div>
                </div>
            </div>
        </ThumbnailCardWrapper>
    );
}

export interface ThumbnailCardWrapperStyledProps {
    backgroundColor?: string;
    borderRadius?: string;
    height?: string | number;
    width?: string | number;
    textColor?: string;
    fontSize?: string;
    textGap?: string;
    imageBackground: string;
    aspectRatio?: string;
    transform?: string;
}

const ThumbnailCardWrapper = styled.div<ThumbnailCardWrapperStyledProps>`
    background: ${({ imageBackground }) => imageBackground};
    border-radius: ${({ borderRadius }) => borderRadius};
    height: ${({ height }) => (height ? height + "px" : "100%")} !important;
    width: ${({ width }) => (width ? width + "px" : "100%")} !important;
    overflow: hidden;

    .ThumbnailCard__inner {
        width: ${({ height }) => (height ? height + "px" : "100%")} !important;
        height: ${({ width }) => (width ? width + "px" : "100%")} !important;
        position: relative;
    }

    .ThumbnailCard__image-wrapper {
        width: 100%;
        min-height: inherit;
        height: auto;

        & img {
            min-height: inherit;
            object-fit: cover;
            aspect-ratio: ${({ aspectRatio }) => aspectRatio ?? "auto"};
            transform: ${({ transform }) => transform ?? "initial"};
        }
    }

    .ThumbnailCard__info-container {
        position: absolute;
        z-index: 1;
        top: 0;
        left: 0;
        bottom: 0;
        right: 0;
        pointer-events: none;

        display: flex;
        flex-flow: column nowrap;
        justify-content: space-between;
        align-items: stretch;

        color: ${({ textColor }: ThumbnailCardWrapperStyledProps) => textColor};
        font-size: ${({ fontSize }: ThumbnailCardWrapperStyledProps) => fontSize} !important;
    }

    .ThumbnailCard__info-container-item.top {
        padding: ${({ textGap }: ThumbnailCardWrapperStyledProps) => textGap};
        background: rgba(0, 0, 0, 0.1);
        display: flex;
        flex-flow: row nowrap;
        justify-content: space-between;
        align-items: center;
        pointer-events: auto;
    }

    .ThumbnailCard__info-container-item.tag-list {
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        gap: ${({ textGap }: ThumbnailCardWrapperStyledProps) => textGap};
    }

    .card-tag {
        font-size: ${({ fontSize }: ThumbnailCardWrapperStyledProps) => fontSize} !important;
        line-height: 1em;
        background-color: ${({ backgroundColor }: ThumbnailCardWrapperStyledProps) => backgroundColor};
        border-radius: ${({ borderRadius }: ThumbnailCardWrapperStyledProps) => borderRadius};
        padding: ${({ textGap }: ThumbnailCardWrapperStyledProps) => textGap};
        height: fit-content;
    }

    .upload-btn {
        scale: 0.8;
        padding: 0;
    }
`;
