import Groq from "groq-sdk";

export function useLlm(apiKey: string) {
	const groq = new Groq({
		apiKey,
		dangerouslyAllowBrowser: true,
	});

	function callLlm(system: string, prompt: string) {
		return groq.chat.completions.create({
			messages: [
				{
					role: "system",
					content: system,
				},
				{
					role: "user",
					content: prompt,
				},
			],
			model: "llama3-70b-8192",
			max_tokens: 300,
		});
	}

	return {
		callLlm,
	};
}

export async function checkApiKeyIsValid(apiKey: string): Promise<boolean> {
	const groq = new Groq({
		apiKey,
		dangerouslyAllowBrowser: true,
	});

	try {
		await groq.chat.completions.create({
			messages: [
				{
					role: "system",
					content: "You are a helpful assistant.",
				},
			],
			model: "llama3-70b-8192",
			max_tokens: 10,
		});
		return true;
	} catch (error) {
		return false;
	}
}
