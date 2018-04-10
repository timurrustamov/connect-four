export interface Action<T extends string> {
  type: T;
}

export interface ActionWithPayload<T extends string, P extends Object>
  extends Action<T> {
  payload: P;
}

/**
 * Creates an action creator
 * @param type Actions type
 */
export function createAction<T extends string>(type: T): Action<T>;
export function createAction<T extends string, P extends Object>(
  type: T,
  payload: P
): ActionWithPayload<T, P>;
export function createAction<T extends string, P extends Object>(
  type: T,
  payload?: P
) {
  return payload === undefined ? { type } : { type, payload };
}

export default createAction;
