export type Event = {
	id: string;
	name: string;
	description: string;
	dates: {
		begin: Date;
		end: Date;
	}
	location: {
		latitude: string;
		longitude: string;
	};
	distance: number;
};
