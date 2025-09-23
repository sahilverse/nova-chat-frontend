import { store } from '@/store';
import { logoutThunk, clearAuth, setAccessToken as setReduxAccessToken } from '@/slices/auth';


export function getAccessToken(): string | null {
    return store.getState().auth.accessToken;
}


export function setAccessToken(token: string | null): void {
    store.dispatch(setReduxAccessToken(token));
}


export function logout(): void {
    store.dispatch(logoutThunk());
    store.dispatch(clearAuth());
    window.location.href = '/login';
}