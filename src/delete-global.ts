import { getGlobal } from './get-global';

/** Loads a global variable then deletes it. Only used for unit testing.
 * @returns A function that restores the original global variable. */
export function deleteGlobal(name: string): () => void {
	const originalValue = getGlobal(name);
	delete (globalThis as any)[name];
	return function restoreOriginal() {
		(globalThis as any)[name] = originalValue;
	};
}
