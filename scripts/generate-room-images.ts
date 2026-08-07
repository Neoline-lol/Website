import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import { ROOMS } from '../src/lib/server/rooms';

const INPUT = 'static/images/bg_grid.png';
const OUTPUT = 'static/generated/rooms';

const SIZE = 256;

await mkdir(OUTPUT, { recursive: true });

for (const room of ROOMS.values()) {
	const hash = room.hash.toUpperCase();
	const fontSize = hash.length === 4 ? 56 : 68;

	const background = await sharp(INPUT).resize(SIZE, SIZE).png().toBuffer();

	const svg = `
	<svg
		xmlns="http://www.w3.org/2000/svg"
		width="${SIZE}"
		height="${SIZE}"
		viewBox="0 0 ${SIZE} ${SIZE}">
	
		<defs>
			<filter id="glow"
				x="-50%"
				y="-50%"
				width="200%"
				height="200%">
				<feGaussianBlur
					stdDeviation="4"
					result="blur" />
				<feMerge>
					<feMergeNode in="blur" />
					<feMergeNode in="SourceGraphic" />
				</feMerge>
			</filter>
		</defs>
	
		<text
			x="${SIZE / 2}"
			y="${SIZE / 2}"
			text-anchor="middle"
			dominant-baseline="central"
			font-family="Inter, Arial, sans-serif"
			font-size="${fontSize}"
			font-weight="800"
			fill="#00ffff"
			filter="url(#glow)">
			${hash}
		</text>
	
	</svg>
	`.trim();

	const textLayer = await sharp(Buffer.from(svg)).png().toBuffer();

	await sharp(background)
		.composite([
			{
				input: textLayer,
				top: 0,
				left: 0
			}
		])
		.png()
		.toFile(`${OUTPUT}/${room.hash}.png`);

	console.log(`Generated ${room.hash}.png`);
}
