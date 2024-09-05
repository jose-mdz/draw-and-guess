"use client";

import { useKeyboardShortcut } from "@/hooks/use-keyboard-shortcut";
import { useViewportSize } from "@/hooks/use-viewport-size";
import { useDrawEditor } from "@/providers/draw-editor-provider";
import { useEffect } from "react";

export function DrawCanvas({
	onImageChange,
}: {
	onImageChange?: (image: string | null) => void;
}) {
	const { canvasRef, image, undo } = useDrawEditor();
	const { width, height } = useViewportSize();

	useKeyboardShortcut({
		char: "z",
		meta: true,
		callback: undo,
	});

	useEffect(() => {
		onImageChange?.(image);
	}, [image, onImageChange]);

	return (
		<>
			<canvas
				ref={canvasRef}
				width={width}
				height={height}
				className="  fixed inset-0 "
			/>
		</>
	);
}
