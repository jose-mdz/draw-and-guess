"use client";
import useLocalStorage from "@/hooks/use-localstorage";
import { providerFactory } from "../lib/provider-factory";

const [KeysProvider, useKeys] = providerFactory(() => {
	const [keys, setKeys] = useLocalStorage<Keys | null>("kingdom_keys", null);

	return {
		keys,
		setKeys,
	};
});

export { KeysProvider, useKeys };
