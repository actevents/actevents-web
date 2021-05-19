export type Event = {
	id: string;
	name: string;
	description: string;
	price: number;
	dates: {
		begin: Date;
		end: Date;
	}
	location: {
		latitude: string;
		longitude: string;
	};
	distance: number;
	s3BucketUrl?: string;
};
