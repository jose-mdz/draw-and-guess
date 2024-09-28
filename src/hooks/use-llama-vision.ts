import Groq from "groq-sdk";

export function useLlamaVision(apiKey: string) {
	const groq = new Groq({
		apiKey,
		dangerouslyAllowBrowser: true,
	});

	function callLlamaVision(prompt: string, image_url: string) {
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
			model: "llama-3.2-11b-vision-preview",
			max_tokens: 300,
		});
	}

	return {
		callLlamaVision,
	};
}
