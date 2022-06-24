/** Loads a global variable and asserts its type */
export function getGlobal<Value>(name: string): Value {
	const value: Value = (globalThis as any)[name];
	return value;
}
