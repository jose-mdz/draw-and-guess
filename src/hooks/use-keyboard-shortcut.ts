import { useEffect } from "react";

interface KeybardShortcut {
	char: string;
	meta?: boolean;
	callback: () => void;
	includeInputElements?: boolean;
}

const useKeyboardShortcut = (
	props: KeybardShortcut | KeybardShortcut[],
): void => {
	useEffect(() => {
		const shortcuts: KeybardShortcut[] = Array.isArray(props) ? props : [props];
		const handler = (event: KeyboardEvent): void => {
			for (const {
				char,
				meta = false,
				callback,
				includeInputElements,
			} of shortcuts) {
				if (meta) {
					if (!(event.ctrlKey || event.metaKey)) {
						continue;
					}
				}
				if (
					document.activeElement?.tagName === "TEXTAREA" ||
					document.activeElement?.tagName === "INPUT"
				) {
					if (!includeInputElements) {
						continue;
					}
				}
				if (event.key === char) {
					event.preventDefault();
					callback();
				}
			}
		};

		window.addEventListener("keydown", handler);

		return () => {
			window.removeEventListener("keydown", handler);
		};
	}, [props]);
};

export { useKeyboardShortcut };
