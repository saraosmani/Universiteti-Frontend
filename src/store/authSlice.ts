export interface User {
  id:           number;
  name:         string;
  email:        string;
  role:         string;
  phone_number?: string | null;
  country?:     string | null;
}

export interface AuthState {
  user:  User  | null;
  token: string | null;
}

export interface SetUserPayload {
  user:  User;
  token: string;
}

export const AUTH_ACTIONS = {
  SET_USER: "auth/SET_USER",
  LOGOUT:   "auth/LOGOUT",
} as const;

type AuthAction =
  | { type: typeof AUTH_ACTIONS.SET_USER; payload: SetUserPayload }
  | { type: typeof AUTH_ACTIONS.LOGOUT };


export const setUser = (payload: SetUserPayload): AuthAction => ({
  type: AUTH_ACTIONS.SET_USER,
  payload,
});

export const logout = (): AuthAction => ({
  type: AUTH_ACTIONS.LOGOUT,
});


const initialState: AuthState = {
  user:  null,
  token: null,
};

export const authReducer = (
  state: AuthState = initialState,
  action: AuthAction
): AuthState => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_USER:
      return { ...state, user: action.payload.user, token: action.payload.token };
    case AUTH_ACTIONS.LOGOUT:
      return initialState;
    default:
      return state;
  }
};


export interface RootState {
  auth: AuthState;
}

export const selectUser            = (state: RootState): User | null    => state.auth.user;
export const selectToken           = (state: RootState): string | null  => state.auth.token;
export const selectIsAuthenticated = (state: RootState): boolean        => !!state.auth.token;