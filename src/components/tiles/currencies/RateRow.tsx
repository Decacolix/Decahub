import { use } from 'react';
import { SettingsContext } from '../../../App';

type TypeRateRowProps = {
	code: string;
	name: string;
	value: number;
};

const RateRow = ({ code, name, value }: TypeRateRowProps) => {
	const { baseCurrency } = use(SettingsContext);
	let formattedValue: string;

	formattedValue = value.toFixed(2);
	if (value.toFixed(2) === '0.00') formattedValue = value.toFixed(3);
	if (value.toFixed(3) === '0.000') formattedValue = value.toFixed(4);

	return (
		<div className="flex justify-between items-center">
			<div className="flex items-center">
				<div className="mr-3 bg-[url(src/assets/icons/star-icon.svg)] bg-no-repeat bg-center bg-cover h-5 w-5" />
				<div>
					<div className="text-2xl">{code}</div>
					<div>{name}</div>
				</div>
			</div>
			<div className="text-2xl">{`${formattedValue.replace(
				'.',
				','
			)} ${baseCurrency}`}</div>
		</div>
	);
};

export default RateRow;
