import { useEffect, useRef, useState } from "react";
import { providerFactory } from "../lib/provider-factory";

type Tool = "eraser" | "pen";

const [DrawEditorProvider, useDrawEditor] = providerFactory(() => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const [undoStack, setUndoStack] = useState<string[]>([]);
	const [undoStaging, setUndoStaging] = useState<string | null>(null);
	const [selectedColor, setSelectedColor] = useState("black");
	const [isDrawing, setIsDrawing] = useState(false);
	const [lineSize, setLineSize] = useState(5);
	const [tool, setTool] = useState<Tool>("pen");
	const [image, setImage] = useState<string | null>(null);

	function undo() {
		if (undoStack.length > 0) {
			const last = undoStack.pop();
			if (!last) return;
			setUndoStack(undoStack);
			applyImage(last);
			setUndoStaging(last);
		}
	}

	function applyImage(last: string) {
		const img = new Image();
		img.src = last;
		img.onload = () => {
			const canvas = canvasRef.current;
			if (!canvas) return;
			const context = canvas.getContext("2d");
			if (!context) return;
			context.clearRect(0, 0, canvas.width, canvas.height);
			context.drawImage(img, 0, 0);
			setImage(canvas.toDataURL());
		};
	}

	function storeUndo() {
		if (undoStaging) {
			setUndoStack((undoStack) => [...undoStack, undoStaging]);
		}

		setUndoStaging(canvasRef.current?.toDataURL() || "");
	}

	function clear() {
		const canvas = canvasRef.current;
		if (!canvas) return;
		const context = canvas.getContext("2d");

		if (!context) return;
		context.clearRect(0, 0, canvas.width, canvas.height);

		setImage(null);
	}

	useEffect(() => {
		function canvasToImage(): string {
			const canvas = canvasRef.current;
			if (!canvas) return "";
			return canvas.toDataURL("image/png");
		}

		const canvas = canvasRef.current;

		if (!canvas) return;

		const context = canvas.getContext("2d");

		if (!context) return;

		const startDrawing = (event: MouseEvent | TouchEvent) => {
			setIsDrawing(true);
			context.lineCap = "round";
			context.lineWidth = lineSize;
			context.strokeStyle = selectedColor;
			context.beginPath();
			context.moveTo(getX(event), getY(event));
		};

		const draw = (event: MouseEvent | TouchEvent) => {
			if (!isDrawing) return;
			if (tool === "eraser") {
				context.clearRect(getX(event), getY(event), lineSize, lineSize);
			} else {
				context.lineTo(getX(event), getY(event));
				context.stroke();
			}
			setImage(canvasToImage());
		};

		const stopDrawing = () => {
			if (isDrawing) {
				storeUndo();
			}
			setIsDrawing(false);

			context.closePath();
		};

		const getX = (event: MouseEvent | TouchEvent) => {
			if (event instanceof TouchEvent && event.touches && event.touches[0]) {
				return event.touches[0].clientX - canvas.offsetLeft;
			}

			if (event instanceof MouseEvent) {
				return event.clientX - canvas.offsetLeft;
			}

			return 0;
		};

		const getY = (event: MouseEvent | TouchEvent) => {
			if (event instanceof TouchEvent && event.touches && event.touches[0]) {
				return event.touches[0].clientY - canvas.offsetTop;
			}

			if (event instanceof MouseEvent) {
				return event.clientY - canvas.offsetTop;
			}

			return 0;
		};

		canvas.addEventListener("mousedown", startDrawing);
		canvas.addEventListener("mousemove", draw);
		canvas.addEventListener("mouseup", stopDrawing);
		canvas.addEventListener("mouseleave", stopDrawing);

		canvas.addEventListener("touchstart", startDrawing);
		canvas.addEventListener("touchmove", draw);
		canvas.addEventListener("touchend", stopDrawing);

		return () => {
			canvas.removeEventListener("mousedown", startDrawing);
			canvas.removeEventListener("mousemove", draw);
			canvas.removeEventListener("mouseup", stopDrawing);
			canvas.removeEventListener("mouseleave", stopDrawing);

			canvas.removeEventListener("touchstart", startDrawing);
			canvas.removeEventListener("touchmove", draw);
			canvas.removeEventListener("touchend", stopDrawing);
		};
	}, [isDrawing, selectedColor, lineSize, storeUndo, tool]);

	// biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
	useEffect(() => {
		if (canvasRef.current) {
			clear();
			if (undoStack.length === 0) {
				setUndoStaging(canvasRef.current?.toDataURL() || "");
			}
		}
	}, [canvasRef.current]);

	return {
		canvasRef,
		undoStack,
		undoStaging,
		selectedColor,
		isDrawing,
		lineSize,
		tool,
		image,
		setUndoStack,
		setUndoStaging,
		setSelectedColor,
		setIsDrawing,
		setLineSize,
		setTool,
		clear,
		undo,
		applyImage,
		storeUndo,
	};
});

export { DrawEditorProvider, useDrawEditor };
