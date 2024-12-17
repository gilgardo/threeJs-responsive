// TickableTypes.ts
type TickFunction = ((delta: number, elapsed: number) => void) | (() => void);

export interface Tickable {
  tick: TickFunction;
}
