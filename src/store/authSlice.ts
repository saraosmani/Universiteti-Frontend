export interface Pedagog {
  ped_id: string;
  ped_em: string;
  ped_mb: string;
  ped_gjin: string;
  ped_tit: string;
  ped_dl: string;
  ped_tel: string;
  ped_email: string;
  ped_dt: string;
  dep_id: string | null;
  user_id: number;
}

export interface Student {
  stu_id: string;
  stu_em: string;
  stu_mb: string;
  stu_atesi: string;
  stu_gjini: string;
  stu_dl: string;
  stu_nuid: string;
  stu_email: string;
  stu_dat_regjistrim: string;
  stu_status: string;
  user_id: number;
}

export interface User {
  id: number;
  name: string;
  email: string;
  role: string;
  phone_number?: string | null;
  country?: string | null;
  surname?: string | null;
  title?: string | null;
  pedagog?: Pedagog;
  student?: Student;
}

export interface AuthState {
  user: User | null;
  token: string | null;
}

export interface SetUserPayload {
  user: User;
  token: string;
}

export const AUTH_ACTIONS = {
  SET_USER: "auth/SET_USER",
  LOGOUT: "auth/LOGOUT",
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
  user: null,
  token: null,
};

export const authReducer = (
  state: AuthState = initialState,
  action: AuthAction,
): AuthState => {
  switch (action.type) {
    case AUTH_ACTIONS.SET_USER:
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    case AUTH_ACTIONS.LOGOUT:
      return initialState;
    default:
      return state;
  }
};

export interface RootState {
  auth: AuthState;
}

export const selectUser = (state: RootState): User | null => state.auth.user;
export const selectToken = (state: RootState): string | null =>
  state.auth.token;
export const selectIsAuthenticated = (state: RootState): boolean =>
  !!state.auth.token;
