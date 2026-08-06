const SIZE = 256;

export function createRoomSvg(hash: string): string {
	return `
<svg
	xmlns="http://www.w3.org/2000/svg"
	width="${SIZE}"
	height="${SIZE}"
	viewBox="0 0 ${SIZE} ${SIZE}">

	<defs>
		<filter id="glow">
			<feGaussianBlur stdDeviation="4" result="blur" />
			<feMerge>
				<feMergeNode in="blur" />
				<feMergeNode in="blur" />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>
	</defs>

	<image
		href="/images/bg_grid.png"
		width="${SIZE}"
		height="${SIZE}" />

	<text
		x="50%"
		y="50%"
		text-anchor="middle"
		dominant-baseline="central"
		font-family="Inter, Arial, sans-serif"
		font-size="64"
		font-weight="800"
		fill="#00ffff"
		filter="url(#glow)">
		${hash.toUpperCase()}
	</text>

</svg>`.trim();
}
