const SIZE = 256;

export function createRoomSvg(hash: string): string {
	return `
<svg
	xmlns="http://www.w3.org/2000/svg"
	width="${SIZE}"
	height="${SIZE}"
	viewBox="0 0 ${SIZE} ${SIZE}">

	<image
		href="/images/bg_grid.png"
		width="${SIZE}"
		height="${SIZE}" />

	<text
		x="50%"
		y="54%"
		text-anchor="middle"
		dominant-baseline="middle"
		font-family="Inter, Arial, sans-serif"
		font-size="48"
		font-weight="700"
		fill="white">
		${hash.toUpperCase()}
	</text>

</svg>`.trim();
}
