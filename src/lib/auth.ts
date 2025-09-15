import { store } from '@/store';
import { logoutThunk } from '@/slices/auth';

export function getAccessToken(): string | null {
    return store.getState().auth.accessToken;
}


export function setAccessToken(token: string | null): void {
    store.dispatch({ type: "auth/setAccessToken", payload: token });
}


export function logout(): void {
    store.dispatch(logoutThunk());
}