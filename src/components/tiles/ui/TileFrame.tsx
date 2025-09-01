import type { ReactNode } from 'react';

type TypeTileFrameProps = {
	height: string;
	z: string;
	children?: ReactNode;
};

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
