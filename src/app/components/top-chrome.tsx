import GroqLogo from "@/components/groq-logo";
import { reduceToThreeDigits } from "@/lib/utils";
import { useLetMeGuess } from "@/providers/let-me-guess-provider";
import { Zap } from "lucide-react";

export function TopChrome() {
	const { interpretation, lastSpeed, working } = useLetMeGuess();
	return (
		<div className="fixed flex flex-col items-center gap-1 z-10 top-0 left-0 w-full">
			<div className="flex flex-col gap-1 items-center">
				<GroqLogo className="mt-4" height={20} />
			</div>
			<div className="border mt-2 bg-white border-border px-3 py-1 rounded-full flex gap-3 items-center">
				{working
					? "Guessing..."
					: trimText(interpretation) || "Draw something and I'll guess ..."}
				{lastSpeed > 0 && (
					<>
						<Zap size={16} className="text-[#f55036]" />
						<div className="text-sm text-gray-500">
							{reduceToThreeDigits(lastSpeed)}ms
						</div>
					</>
				)}
			</div>
		</div>
	);
}

function trimText(text: string, maxWords = 5) {
	const words = text.split(" ");
	if (words.length <= maxWords) return text;

	return `${words.slice(0, maxWords).join(" ")}...`;
}
