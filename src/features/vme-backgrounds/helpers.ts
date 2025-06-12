import { BackgroundAI, BackgroundAIOption, BackgroundAIPrompt } from "./services";

export interface ReplicateInputType {
    version: string;
    input: {
        width: string;
        height: string;
        prompt: string;
        negative_prompt: string;
        guidance_scale: number;
        lora_scale: number;
        num_inference_steps: number;
    };
}

export function convertToReplicateInput(backgroundAI: BackgroundAI, numGenerations: number): ReplicateInputType[] {
    const { prompts, sets } = backgroundAI.settings;
    const { settings } = backgroundAI;
    if (!prompts || !sets) return [];

    const options = sets.map((set) => set.options);

    const replicateInputResult: ReplicateInputType[] = [];
    for (let i = 0; i < numGenerations; i++) {
        const randomValues = generateRandomValues(options);
        const promptText = replacePromptText(prompts, randomValues);

        const input: ReplicateInputType = {
            version: settings.modelVersion,
            input: {
                width: settings.width,
                height: settings.height,
                prompt: promptText,
                negative_prompt: prompts.find((prompt) => prompt.weight === -1)?.text ?? "",
                guidance_scale: settings.guidanceScale,
                lora_scale: settings.loraScale,
                num_inference_steps: settings.diffusionSteps
            }
        };

        replicateInputResult.push(input);
    }

    return replicateInputResult;
}

function generateRandomValues(options: BackgroundAIOption[][]): string[] {
    return options.map((category) => {
        const optionIndex = Math.floor(Math.random() * category.length);
        return category[optionIndex].promptValue;
    });
}

function replacePromptText(prompts: BackgroundAIPrompt[], values: string[]): string {
    let promptText = prompts[0].text;

    for (let i = 0; i < values.length; i++) {
        const placeholder = new RegExp(`\\{${i}\\}`, "g");
        promptText = promptText.replace(placeholder, values[i]);
    }

    return promptText;
}
