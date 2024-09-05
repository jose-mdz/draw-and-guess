import { useState } from "react";

export function useUndoRedo<T>(initialState: T): {
	document: T;
	setDocument(s: T): void;
	undo(): void;
	redo(): void;
	store(): void;
} {
	const [document, setDocument] = useState(initialState);
	const [undoStack, setUndoStack] = useState<T[]>([initialState]);
	const [redoStack, setRedoStack] = useState<T[]>([]);

	const store = () => {
		setUndoStack([...undoStack, document]);
		setRedoStack([]);
	};

	const undo = () => {
		if (undoStack.length > 1) {
			const last = undoStack[undoStack.length - 1];
			const desired = undoStack[undoStack.length - 2];
			setUndoStack(undoStack.slice(0, undoStack.length - 1));
			setRedoStack([...redoStack, last]);
			setDocument(desired);
		}
	};

	const redo = () => {
		if (redoStack.length > 0) {
			const last = redoStack[redoStack.length - 1];
			setUndoStack([...undoStack, last]);
			setRedoStack(redoStack.slice(0, redoStack.length - 1));
			setDocument(last);
		}
	};

	return { document, setDocument, undo, redo, store };
}
