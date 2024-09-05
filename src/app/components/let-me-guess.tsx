"use client";
import { DrawCanvas } from "../components/draw-canvas";
import { DrawEditorProvider } from "@/providers/draw-editor-provider";
import { TopCommands } from "./top-commands";
import { PaletteBar } from "./palette-bar";
import { PenAndEraserBar } from "./pen-and-eraser-bar";
import { useLetMeGuess } from "@/providers/let-me-guess-provider";
import { TopChrome } from "./top-chrome";

export function LetMeGuess() {
	const { setCurrentImage } = useLetMeGuess();
	return (
		<>
			<DrawEditorProvider>
				<DrawCanvas onImageChange={setCurrentImage} />
				<TopCommands />
				<PaletteBar />
				<PenAndEraserBar />
			</DrawEditorProvider>
			<TopChrome />
		</>
	);
}
