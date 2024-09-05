import { type Context, createContext, useContext } from "react";
import type React from "react";

export function providerFactory<T>(
	hook: (options?: unknown) => T,
): [({ children }: { children: React.ReactNode }) => JSX.Element, () => T] {
	// 1. Create Context
	const context = createContext<T>({} as T);

	// 2. Create Provider
	const Provider = ({ children }: { children: React.ReactNode }) => {
		const state = hook();
		return <context.Provider value={state}>{children}</context.Provider>;
	};

	// 3. Create Hook
	const useProvider = () => useContextOrDie(context);

	// Expose Provider and Hook
	return [Provider, useProvider];
}

function useContextOrDie<T>(context: Context<T>): T {
	const value = useContext(context);

	if (!value) {
		throw new Error("trying to use context outside a valid context");
	}

	return value;
}
