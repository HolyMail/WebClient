type GoogleLoginOptions = {
    type: "google-oauth2",
    user: string,
    oauth2: string,
};

type AppleLoginOptions = {
    type: "apple-login",
    user: string,
    password: string,
};

type LoginOptions = GoogleLoginOptions | AppleLoginOptions;

export type {
    LoginOptions,
    GoogleLoginOptions,
    AppleLoginOptions,
}