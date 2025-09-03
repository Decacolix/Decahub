import { useEffect, useState } from 'react';

type TypeLoader = {
	infoText?: string;
};

/* Animated loading circle with an optional info text. */
const Loader = ({ infoText }: TypeLoader) => {
	const [displayAdditionalInfo, setDisplayAdditionalInfo] =
		useState<boolean>(false);

	/* Display the optional info text after 1 second of loading. */
	useEffect(() => {
		const timeoutId = setTimeout(() => {
			setDisplayAdditionalInfo(
				prevDisplayAdditionalInfo => !prevDisplayAdditionalInfo
			);
		}, 1000);

		return () => clearTimeout(timeoutId);
	}, []);

	return (
		<>
			<div className="loader" />
			{displayAdditionalInfo ? (
				<div className="absolute left-[50%] translate-x-[-50%] top-[60%]">
					{infoText}
				</div>
			) : null}
		</>
	);
};

export default Loader;
