export type AuthUser = {
    id: string;
    name?: string;
    email?: string;
    profileImage?: string
};

export interface AuthState {
    accessToken: string | null;
    user: AuthUser | null;
    status: "idle" | "loading" | "succeeded" | "failed";
    errorMessage: string | null;
    fieldErrors: Record<string, string> | null;
}
