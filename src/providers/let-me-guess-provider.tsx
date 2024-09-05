import { useEffect, useState } from "react";
import { providerFactory } from "../lib/provider-factory";
import { useLlava } from "@/hooks/use-llava";
import { useKeys } from "./keys-provider";
import { addBackground } from "@/lib/utils";

const TIMER_GUESS_TICK = 2_000;

const [LetMeGuessProvider, useLetMeGuess] = providerFactory(() => {
	const { keys } = useKeys();

	if (!keys) {
		throw new Error("No keys");
	}

	const [currentImage, setCurrentImage] = useState<string | null>(null);
	const [working, setWorking] = useState(false);
	const [messages, setMessages] = useState<Message[]>([]);
	const [interpretation, setInterpretation] = useState<string>("");
	const [lastSpeed, setLastSpeed] = useState<number>(0);
	const [lastSubmit, setLastSubmit] = useState<number>(0);
	const { groqApiKey } = keys;
	const { callLlava } = useLlava(groqApiKey);
	const prompt = visionPrompt;

	async function submit() {
		if (!currentImage || working) {
			return;
		}

		setWorking(true);

		setMessages([...messages, { role: "user", content: prompt }]);
		const response = await callLlava(prompt, await addBackground(currentImage));

		const { role, content } = response.choices[0].message;

		setMessages((m) => [...m, { role, content }]);
		setWorking(false);

		const lastOne = response.choices[0].message.content;
		setInterpretation(lastOne || "");

		// biome-ignore lint/suspicious/noExplicitAny: <explanation>
		setLastSpeed((response as any).usage?.total_time || 0);
		setLastSubmit(Date.now());
	}

	useEffect(() => {
		if (!currentImage) {
			setInterpretation("");
			setLastSpeed(0);
		}

		if (Date.now() - lastSubmit >= TIMER_GUESS_TICK) {
			submit();
		}
	}, [currentImage, submit, lastSubmit]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		// Immediate submit if `currentImage` changed and didn't meet threshold
		const timeSinceLastSubmit = Date.now() - lastSubmit;
		if (currentImage && timeSinceLastSubmit < TIMER_GUESS_TICK) {
			// Use a delay to match the remaining time until the threshold is met
			const delay = TIMER_GUESS_TICK - timeSinceLastSubmit;
			const timer = setTimeout(submit, delay);

			return () => clearTimeout(timer); // Clear timeout if component unmounts or re-renders
		}
	}, [currentImage]);

	return {
		currentImage,
		interpretation,
		lastSpeed,
		messages,
		setCurrentImage,
		setInterpretation,
		setMessages,
		working,
	};
});

const visionPrompt = `Describe the image in JUST ONE WORD, example
'''
dog
house
moon
'''`;

export { LetMeGuessProvider, useLetMeGuess };
