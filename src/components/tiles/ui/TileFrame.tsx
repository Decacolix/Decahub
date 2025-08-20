import type { ReactNode } from 'react';

type Props = {
	children?: ReactNode;
};

const TileFrame = ({ children }: Props) => {
	return (
		<div className="h-[40vh] bg-black/30 backdrop-blur-sm flex flex-col justify-center items-center z-40">
			{children}
		</div>
	);
};

export default TileFrame;
