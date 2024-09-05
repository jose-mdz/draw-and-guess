import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export async function addBackground(
	image: string,
	color = "white",
): Promise<string> {
	// Create a new canvas element
	const canvas = document.createElement("canvas");
	const ctx = canvas.getContext("2d");

	if (!ctx) {
		throw new Error("Failed to get canvas context");
	}

	// Create a new image object
	const img = new Image();
	img.src = image;

	// Wait for the image to load
	return new Promise<string>((resolve) => {
		img.onload = () => {
			// Set canvas size to match the image
			canvas.width = img.width;
			canvas.height = img.height;

			// Fill the canvas with the specified background color
			ctx.fillStyle = color;
			ctx.fillRect(0, 0, canvas.width, canvas.height);

			// Draw the image on top of the background
			ctx.drawImage(img, 0, 0);

			// Convert the canvas to a data URL and resolve the promise
			resolve(canvas.toDataURL());
		};
	});
}

export function createGridTile(width: number, height: number) {
	try {
		const canvas = document.createElement("canvas");
		canvas.width = width;
		canvas.height = height;
		const ctx = canvas.getContext("2d");
		if (!ctx) {
			throw new Error("Failed to get canvas context");
		}
		ctx.fillStyle = "white";
		ctx.fillRect(0, 0, width, height);
		ctx.fillStyle = "#d0d0d0";
		ctx.fillRect(width - 1, height - 1, 1, 1);
		return canvas.toDataURL();
	} catch (e) {
		return "";
	}
}

export function reduceToThreeDigits(num: number): number {
	// Convert the number to a string with 15 decimal places
	const numStr = num.toFixed(15);

	// Find the position of the decimal point
	const decimalPos = numStr.indexOf(".");

	// If there's no decimal point or less than 4 characters after the decimal point, return the original number
	if (decimalPos === -1 || numStr.length <= decimalPos + 4) {
		return Number.parseFloat(numStr);
	}

	// Trim the string to the first three digits after the decimal point
	const trimmedStr = numStr.substring(0, decimalPos + 4);

	// Convert back to a number and return
	return Number.parseFloat(trimmedStr);
}
