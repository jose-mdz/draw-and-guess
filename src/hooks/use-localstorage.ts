"use client";

import { useState, useEffect } from "react";

function useLocalStorage<T>(key: string, initialValue: T) {
	// State to store the current value
	const [storedValue, setStoredValue] = useState<T>(() => {
		try {
			// Get from local storage by key
			const item = window.localStorage.getItem(key);
			// Parse stored json or if none return initialValue
			return item ? JSON.parse(item) : initialValue;
		} catch (error) {
			return initialValue;
		}
	});

	// Function to set the value in both state and local storage
	const setValue = (value: T | ((val: T) => T)) => {
		try {
			// Allow value to be a function so we have the same API as useState
			const valueToStore =
				value instanceof Function ? value(storedValue) : value;
			// Save state
			setStoredValue(valueToStore);
			// Save to local storage
			window.localStorage.setItem(key, JSON.stringify(valueToStore));
		} catch (error) {
			console.error("Error setting localStorage key “${key}”: ", error);
		}
	};

	// Effect to update local storage when key or value changes
	useEffect(() => {
		if (window) {
			window.localStorage.setItem(key, JSON.stringify(storedValue));
		}
	}, [key, storedValue]);

	return [storedValue, setValue] as const;
}

export default useLocalStorage;
