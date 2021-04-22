import { IEnvironment } from './environment.type';

export const environment: IEnvironment = {
	production: true,
	cognito: {
		region: 'eu-central-1',
		userPoolId: 'eu-central-1_zUunJTKLc',
		userPoolWebClientId: '7di8jcfd1kbm8d2j19pdshf4uu',
	},
};
