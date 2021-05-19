export interface IEnvironment {
	production: boolean;
	baseUrl: string;
	cognito: {
		region: string;
		userPoolId: string;
		userPoolWebClientId: string;
	};
	api: {
		base: string;
	};
}
