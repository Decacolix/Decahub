import type { ReactNode } from 'react';

type TypeTileFrameProps = {
	height: string;
	z: string;
	children?: ReactNode;
};

/*
 *	Component that wraps a tile.
 *	@typedef {object} TypeTileFrameProps
 *	@property {string} height – The height of the tile.
 *	@property {string} z – The z-index of the tile.
 *	@property {ReactNode} children – The child component of the tile.
 *	@returns {JSX:Element}
 */
const TileFrame = ({ height, z, children }: TypeTileFrameProps) => {
	return (
		<div
			className={`${height} ${z} bg-black/30 backdrop-blur-sm flex flex-col justify-center items-center`}
		>
			{children}
		</div>
	);
};

export default TileFrame;
