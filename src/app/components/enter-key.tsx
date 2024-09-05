import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { LoaderCircle } from "lucide-react";
import { checkApiKeyIsValid } from "@/hooks/use-llm";

export function EnterKey({ onSuccess }: { onSuccess: (keys: Keys) => void }) {
	const [groqApiKey, setGroqApiKey] = useState<string>("");
	const [working, setWorking] = useState(false);
	const [falied, setFailed] = useState(false);

	async function submit() {
		setWorking(true);

		const isValid = await checkApiKeyIsValid(groqApiKey);

		setWorking(false);

		if (isValid) {
			onSuccess({ groqApiKey });
		} else {
			setFailed(true);
		}
	}

	return (
		<form
			className="max-w-[500px] p-5 flex flex-col items-center gap-5 justify-center m-auto"
			onSubmit={(e) => {
				e.preventDefault();
				submit();
			}}
		>
			<h1 className="text-xl pt-5">Enter Groq API Key</h1>
			<Input
				type="password"
				placeholder="Enter Groq API Key"
				value={groqApiKey}
				onChange={(e) => setGroqApiKey(e.target.value)}
			/>
			{falied && (
				<div className="text-red-500">
					The request failed. Please try again.
				</div>
			)}

			<p className="text-sm ">
				You can get one using the{" "}
				<a
					href="https://console.groq.com/keys"
					// biome-ignore lint/a11y/noBlankTarget: <explanation>
					target="_blank"
					className="text-blue-500"
				>
					Groq Developer Console
				</a>
				.
			</p>
			<Button type="submit" onClick={submit} disabled={working}>
				{working && <LoaderCircle className="animate-spin" size={10} />}
				Save & Continue
			</Button>
		</form>
	);
}
