export const SERVERS = [
	{ id: 'us3', region: 'us', base: 46476 },
	{ id: 'uk1', region: 'uk', base: 37600 },
	{ id: 'aus1', region: 'aus', base: 56024 }
];

export const ROOMS_PER_SERVER = 6;
export const HASH_STEP = 16;

export const ROOMS = new Map(
	SERVERS.flatMap(({ id, region, base }) =>
		Array.from({ length: ROOMS_PER_SERVER }, (_, number) => {
			const hash = (base + number * HASH_STEP).toString(36);

			return [
				hash,
				{
					id,
					region,
					number,
					hash
				}
			];
		})
	)
);
