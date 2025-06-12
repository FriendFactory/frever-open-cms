import React from "react";
import { Dropdown } from "antd";

import { MarketingCountries, SelectSongModalContainer } from "./SelectSongModalContainer";

interface SelectSongDropdownContainerProps {
    stage: string;
    children: JSX.Element;
    onSelect: (
        type: "songId" | "externalSongId",
        id: number,
        name?: string | null,
        marketingCountries?: MarketingCountries
    ) => void;
}

export function SelectSongDropdownContainer({ stage, children, onSelect }: SelectSongDropdownContainerProps) {
    return (
        <Dropdown
            menu={{
                items: [
                    {
                        key: "song",
                        label: (
                            <SelectSongModalContainer
                                stage={stage}
                                btnText="Select Song"
                                asset="Song"
                                onClick={(id, name, marketingCountries) =>
                                    onSelect("songId", id, name, marketingCountries)
                                }
                            />
                        )
                    },
                    {
                        key: "external-song",
                        label: (
                            <SelectSongModalContainer
                                stage={stage}
                                btnText="Select External Song"
                                asset="ExternalSong"
                                onClick={(id, name, marketingCountries) =>
                                    onSelect("externalSongId", id, name, marketingCountries)
                                }
                            />
                        )
                    }
                ]
            }}>
            {children}
        </Dropdown>
    );
}
