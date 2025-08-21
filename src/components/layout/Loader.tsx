type TypePropsLoader = {
	size: number;
};

const Loader = ({ size }: TypePropsLoader) => {
	const spinnerStyles = `loader w-${size} h-${size} `;
	return <div className={spinnerStyles} />;
};

export default Loader;
