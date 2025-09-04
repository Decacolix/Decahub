import { useEffect, useState } from 'react';

type TypeLoaderProps = {
	infoText?: string;
};

/*
 *	Component that displays an animated loading circle with an optional info text.
 *	@typedef {object} TypeLoaderProps
 *	@property {string} infoText – The info text to be displayed with the loader.
 *	@returns {JSX:Element}
 */
const Loader = ({ infoText }: TypeLoaderProps) => {
	const [displayAdditionalInfo, setDisplayAdditionalInfo] =
		useState<boolean>(false);

	/*
	 *	Hook that handles displaying the optional info text after 1 second of loading.
	 */
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
