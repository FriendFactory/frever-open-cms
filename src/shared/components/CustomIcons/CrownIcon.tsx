import Icon from "@ant-design/icons";
import * as React from "react";
import { SVGProps } from "react";

const CrownIcon = ({ iconType, ...props }: SVGProps<SVGSVGElement> & { iconType?: "bronze" | "silver" | "gold" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" {...props} width={16} height={16}>
        <path
            d="M15.176 2.16a1.166 1.166 0 0 0-.77-.086 1.29 1.29 0 0 0-.683.418L12 4.461 8.941.969A1.254 1.254 0 0 0 8 .519c-.355 0-.691.165-.941.45L4 4.46 2.277 2.492a1.29 1.29 0 0 0-.683-.418 1.19 1.19 0 0 0-.77.086 1.38 1.38 0 0 0-.597.563C.078 2.973 0 3.266 0 3.57v8.063c0 1.012.352 1.98.977 2.695.625.711 1.472 1.113 2.355 1.117h9.336c.883-.004 1.73-.406 2.355-1.117.625-.715.977-1.683.977-2.695V3.57c0-.304-.078-.597-.223-.847a1.411 1.411 0 0 0-.601-.563Zm0 0"
            style={{
                stroke: "none",
                fillRule: "nonzero",
                fill: iconType ? baseColors[iconType] : baseColors["silver"],
                fillOpacity: 1
            }}
        />
    </svg>
);
export default (props: { iconType?: "bronze" | "silver" | "gold" }) => (
    <Icon component={() => <CrownIcon iconType={props.iconType} />} />
);

const baseColors = {
    gold: "#ffe14d",
    silver: "#9b9b9b",
    bronze: "#97641f"
} as const;
