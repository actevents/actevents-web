import { IEnvironment } from './environment.type';

export const environment: IEnvironment = {
	production: true,
	baseUrl: 'https://app.actevents.de',
	cognito: {
		region: 'eu-central-1',
		userPoolId: 'eu-central-1_zUunJTKLc',
		userPoolWebClientId: '7di8jcfd1kbm8d2j19pdshf4uu',
	},
	api: {
		base: 'https://qwsopzco8h.execute-api.eu-central-1.amazonaws.com/default'
	}
};
