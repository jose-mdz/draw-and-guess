import { SliderVertical } from "@/components/slider-vertical";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDrawEditor } from "@/providers/draw-editor-provider";
import { Eraser, Pen } from "lucide-react";
import { useEffect, useState } from "react";

export function PenAndEraserBar() {
	const { tool, setTool, lineSize, setLineSize, selectedColor } =
		useDrawEditor();
	const [showStroke, setShowStroke] = useState(false);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		setShowStroke(true);
		const timer = setTimeout(() => {
			setShowStroke(false);
		}, 1000);

		return () => clearTimeout(timer);
	}, [lineSize]);

	return (
		<div className="fixed right-1 flex flex-col items-center gap-1 top-1/2 -translate-y-1/2">
			<Button
				variant={tool === "pen" ? "default" : "outline"}
				size={"icon"}
				onClick={() => setTool("pen")}
			>
				<Pen size={16} />
			</Button>

			<SliderVertical
				value={[lineSize]}
				onValueChange={(value) => setLineSize(value[0])}
				max={100}
				min={1}
				step={1}
				className="h-[200px]"
			/>
			<Button
				variant={tool === "eraser" ? "default" : "outline"}
				size={"icon"}
				onClick={() => setTool("eraser")}
			>
				<Eraser size={16} />
			</Button>
			<div
				className={cn(
					"bg-red-500  absolute right-[30px] top-1/2 -translate-y-1/2 rounded-full",
					!showStroke && "!hidden",
				)}
				style={{
					width: `${lineSize}px`,
					height: `${lineSize}px`,
					backgroundColor: selectedColor,
				}}
			/>
		</div>
	);
}
