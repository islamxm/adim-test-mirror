export const callbacks: Map<string, () => void> = new Map();

export const setCallback_screenFillingCircle = (id: string, cb: () => void) => callbacks.set(id, cb);

export const runCallback = (cbId: string) => {
  callbacks.get(cbId)?.();
  callbacks.delete(cbId);
}