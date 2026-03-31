import { createStore, combineReducers } from "redux";
import { authReducer }                  from "./authSlice";
import type { RootState }               from "./authSlice";

const rootReducer = combineReducers({
  auth: authReducer,
});

// ─── Persistence ──────────────────────────────────────────────────────────────
const STORAGE_KEY = "universiteti_auth_state";

const loadState = (): RootState | undefined => {
  try {
    const serialized = localStorage.getItem(STORAGE_KEY);
    if (!serialized) return undefined;
    return JSON.parse(serialized);
  } catch {
    return undefined;
  }
};

const saveState = (state: RootState) => {
  try {
    const serialized = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serialized);
  } catch {
    // ignore
  }
};

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: () => any;
  }
}

const persistedState = loadState();

export const store = createStore(
  rootReducer,
  persistedState as any,
  window.__REDUX_DEVTOOLS_EXTENSION__?.()
);

store.subscribe(() => {
  saveState(store.getState());
});

export type { RootState };
export type AppDispatch = typeof store.dispatch;
export default store;