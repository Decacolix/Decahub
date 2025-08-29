import type { ReactNode } from 'react';

type TypeTileFrameProps = {
	height: string;
	children?: ReactNode;
};

const TileFrame = ({ height, children }: TypeTileFrameProps) => {
	return (
		<div
			className={`${height} bg-black/30 backdrop-blur-sm flex flex-col justify-center items-center z-40`}
		>
			{children}
		</div>
	);
};

export default TileFrame;
