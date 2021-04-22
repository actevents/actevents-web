export interface IEnvironment {
    production: boolean;
    cognito: {
        region: string;
        userPoolId: string;
        userPoolWebClientId: string;
    }
}
