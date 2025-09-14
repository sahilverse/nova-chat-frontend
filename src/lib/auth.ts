import { store } from '@/store';

export function getAccessToken(): string | null {
    return store.getState().auth.accessToken;
}


export function setAccessToken(token: string | null): void {
    store.dispatch({ type: "auth/setAccessToken", payload: token });
}