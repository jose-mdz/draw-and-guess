import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useDrawEditor } from "@/providers/draw-editor-provider";
import { FileIcon, Undo } from "lucide-react";

export function TopCommands() {
	const { clear, undoStack, undo } = useDrawEditor();
	return (
		<div className="fixed top-0 left-0 w-full z-20">
			<div className="m-1 flex gap-2">
				<Button
					variant={"outline"}
					size={"icon"}
					onClick={clear}
					disabled={undoStack.length === 0}
				>
					<FileIcon size={16} />
				</Button>
				<Separator orientation="vertical" className="h-10 hidden" />

				<div className="flex-1" />
				<Button
					variant={"outline"}
					size={"icon"}
					onClick={undo}
					disabled={undoStack.length === 0}
				>
					<Undo />
				</Button>
			</div>
		</div>
	);
}
