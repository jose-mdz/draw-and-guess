import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useDrawEditor } from "@/providers/draw-editor-provider";

const colors = [
	"black",
	"white",
	"red",
	"orange",
	"yellow",
	"green",
	"blue",
	"purple",
];

export function PaletteBar() {
	const { selectedColor, setSelectedColor } = useDrawEditor();
	return (
		<div className="fixed left-1 flex flex-col gap-1 top-1/2 -translate-y-1/2">
			{colors.map((color) => (
				<ColorButton
					key={color}
					color={color}
					selected={selectedColor === color}
					onClick={() => setSelectedColor(color)}
				/>
			))}
		</div>
	);
}

function ColorButton({
	color,
	selected,
	onClick,
}: { color: string; selected?: boolean; onClick: () => void }) {
	return (
		<Button
			variant={"outline"}
			size={"icon"}
			onClick={onClick}
			className={cn(selected && "border-black border-2")}
		>
			<div
				className={cn(
					"w-4 h-4 rounded-full border-border border",
					selected && "border-black bg-gray",
				)}
				style={{ backgroundColor: color }}
			/>
		</Button>
	);
}
