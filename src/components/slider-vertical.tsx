"use client";

import * as React from "react";
import * as SliderPrimitive from "@radix-ui/react-slider";

import { cn } from "@/lib/utils";

const SliderVertical = React.forwardRef<
	React.ElementRef<typeof SliderPrimitive.Root>,
	React.ComponentPropsWithoutRef<typeof SliderPrimitive.Root>
>(({ className, ...props }, ref) => (
	<SliderPrimitive.Root
		ref={ref}
		className={cn(
			"relative flex flex-col w-2 h-full touch-none select-none items-center SLIDER_ROOT",
			className,
		)}
		orientation="vertical"
		{...props}
	>
		<SliderPrimitive.Track
			data-orientation="vertical"
			className="relative w-2 h-full grow overflow-hidden rounded-full bg-primary/20 TRACK"
		>
			<SliderPrimitive.Range
				data-orientation="vertical"
				className="absolute w-full bg-primary RAMGE"
			/>
		</SliderPrimitive.Track>
		<SliderPrimitive.Thumb className="block w-4 h-4 rounded-full border border-primary/50 bg-background shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50" />
	</SliderPrimitive.Root>
));
SliderVertical.displayName = SliderPrimitive.Root.displayName;

export { SliderVertical };
