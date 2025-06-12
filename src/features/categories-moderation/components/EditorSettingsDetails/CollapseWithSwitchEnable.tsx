import { Collapse, Form, Switch } from "antd";
import React, { useState } from "react";
import { EditorSettingsFormWrapper } from "./EditorSettingsForm";

export type SettingsName = keyof typeof defaultValues;

export interface CollapseWithSwitchEnableProps {
    name: SettingsName;
    children: React.ReactNode;
    header: string;
}

export function CollapseWithSwitchEnable({ name, header, children }: CollapseWithSwitchEnableProps) {
    const [activeKey, setActiveKey] = useState("");
    return (
        <Form.Item noStyle shouldUpdate>
            {({ getFieldValue, setFieldValue, validateFields }) => {
                const isEnabled = !!getFieldValue(name);
                const setBaseVaues = () => {
                    setActiveKey(!isEnabled ? name : "");
                    setFieldValue(name, isEnabled ? null : defaultValues[name]);
                    validateFields([name]);
                };
                return (
                    <Collapse
                        activeKey={activeKey}
                        collapsible={!isEnabled ? "disabled" : undefined}
                        bordered={false}
                        onChange={() => setActiveKey(activeKey ? "" : name)}
                        items={[
                            {
                                key: name,
                                forceRender: true,
                                label: <h3>{header}</h3>,
                                children: isEnabled ? (
                                    <EditorSettingsFormWrapper>{children}</EditorSettingsFormWrapper>
                                ) : (
                                    <Form.Item noStyle name={name}>
                                        <div></div>
                                    </Form.Item>
                                ),
                                extra: (
                                    <div onClick={(e) => e.stopPropagation()}>
                                        <Switch checked={isEnabled} onClick={setBaseVaues} />
                                    </div>
                                )
                            }
                        ]}></Collapse>
                );
            }}
        </Form.Item>
    );
}

// Values to initialize fields
const defaultValues = {
    levelEditorSettings: {
        cameraAnimationSettings: {
            allowEditing: false,
            templateIds: []
        },
        cameraFilterSettings: {
            allowEditing: false,
            categories: []
        },
        bodyAnimationSettings: {
            allowEditing: false,
            categories: []
        },
        characterSettings: {
            allowEditing: false
        },
        eventDeletionSettings: {
            allowDeleting: false
        },
        musicSettings: {
            allowEditing: false,
            songSettings: {},
            externalSongSettings: {
                ids: []
            },
            userSoundSettings: {
                allowUserSounds: false
            }
        },
        nonLevelVideoUploadSettings: {
            allowUploading: false
        },
        previewLastEventSettings: {
            allowPreview: false
        },
        setLocationSettings: {
            allowPhotoUploading: false,
            allowVideoUploading: false,
            allowChangeDayTime: false,
            allowChangeSetLocation: false,
            categories: [],
            tags: []
        },
        templateSettings: {
            allowEditing: false
        },
        vfxSettings: {
            allowEditing: false,
            categories: []
        },
        voiceFilterSettings: {
            allowEditing: false,
            allowDisablingVoiceFilter: false,
            ids: []
        },

        faceTrackingSettings: { allowSwitching: false }
    },
    postRecordEditorSettings: {
        bodyAnimationSettings: {
            allowEditing: false,
            categories: []
        },
        cameraAnimationSettings: {
            allowEditing: false,
            templateIds: []
        },
        cameraFilterSettings: {
            allowEditing: false,
            categories: []
        },
        captionSettings: {
            allowEditing: false
        },
        characterSettings: {
            allowEditing: false
        },
        eventDeletionSettings: {
            allowDeleting: false
        },
        musicSettings: {
            allowEditing: false,
            songSettings: {},
            externalSongSettings: {
                ids: []
            },
            userSoundSettings: {
                allowUserSounds: false
            }
        },
        outfitSettings: {
            allowEditing: false,
            allowForOwnCharacters: false,
            allowForFreverStars: false,
            allowForFriendCharacters: false,
            allowCreateNew: false
        },
        setLocationSettings: {
            allowPhotoUploading: false,
            allowVideoUploading: false,
            allowChangeDayTime: false,
            allowChangeSetLocation: false,
            categories: [],
            tags: []
        },
        vfxSettings: {
            allowEditing: false,
            categories: []
        },
        voiceFilterSettings: {
            allowEditing: false,
            allowDisablingVoiceFilter: false,
            ids: []
        },
        eventCreationSettings: { templateId: null, allowEventCreation: false },
        volumeSettings: {
            allowEditing: false
        }
    },
    characterEditorSettings: {
        wardrobeCategories: [],
        filterSettings: { allowFiltering: false },
        savingCharacterSettings: { allowSaveCharacter: false },
        savingOutfitSettings: { allowSaveOutfit: false },
        zoomSettings: { allowZooming: false }
    }
};
