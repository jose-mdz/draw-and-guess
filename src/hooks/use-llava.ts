import Groq from "groq-sdk";

export function useLlava(apiKey: string) {
	const groq = new Groq({
		apiKey,
		dangerouslyAllowBrowser: true,
	});

	function callLlava(prompt: string, image_url: string) {
		return groq.chat.completions.create({
			messages: [
				{
					role: "user",
					content: [
						{ type: "text", text: prompt },
						{
							type: "image_url",
							image_url: { url: image_url },
							// biome-ignore lint/suspicious/noExplicitAny: SDK not updated
						} as any,
					],
				},
			],
			temperature: 0,
			model: "llava-v1.5-7b-4096-preview",
			max_tokens: 300,
		});
	}

	return {
		callLlava,
	};
}
