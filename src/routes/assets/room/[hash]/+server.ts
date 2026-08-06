import { ROOMS } from '$lib/server/rooms';
import { createRoomSvg } from '$lib/server/room-image';

export async function GET({ params }) {
	const room = ROOMS.get(params.hash.toLowerCase());

	if (!room) {
		return new Response('Unknown room', { status: 404 });
	}

	return new Response(createRoomSvg(room.hash), {
		headers: {
			'Content-Type': 'image/svg+xml'
		}
	});
}
