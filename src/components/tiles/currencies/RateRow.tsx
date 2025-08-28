import { use } from 'react';
import { SettingsContext } from '../../../App';
import {
	getPinnedCurrenciesSettings,
	setPinnedCurrenciesSettings,
} from '../../options/settings/settingsUtils';

type TypeRateRowProps = {
	code: string;
	name: string;
	value: number;
	pinned: boolean;
};

const RateRow = ({ code, name, value, pinned }: TypeRateRowProps) => {
	const { baseCurrency } = use(SettingsContext);
	let formattedValue: string;
	const pinnedStyle: string =
		'bg-[url(src/assets/icons/star-selected-icon.svg)] mr-3 bg-no-repeat bg-center bg-cover h-5 w-5 hover:cursor-pointer hover:bg-[url(src/assets/icons/star-icon.svg)]';
	const unpinnedStyle: string =
		'bg-[url(src/assets/icons/star-icon.svg)] mr-3 bg-no-repeat bg-center bg-cover h-5 w-5 hover:cursor-pointer hover:bg-[url(src/assets/icons/star-selected-icon.svg)]';

	const handlePinnedChange = (e: React.MouseEvent<HTMLDivElement>): void => {
		const currencyCode: string | undefined = (
			e.target as HTMLDivElement
		).closest('li')?.id;
		const currentPinnedCurrencies: string[] = getPinnedCurrenciesSettings();

		if (currentPinnedCurrencies.includes(currencyCode as string)) {
			setPinnedCurrenciesSettings(
				currentPinnedCurrencies.filter(item => item !== currencyCode)
			);
			(e.target as HTMLDivElement).classList.add('pinned');
		}

		if (!currentPinnedCurrencies.includes(currencyCode as string)) {
			currentPinnedCurrencies.push(currencyCode as string);
			setPinnedCurrenciesSettings(currentPinnedCurrencies.sort());
			(e.target as HTMLDivElement).classList.remove('pinned');
		}
	};

	formattedValue = value.toFixed(2);
	if (value.toFixed(2) === '0.00') formattedValue = value.toFixed(3);
	if (value.toFixed(3) === '0.000') formattedValue = value.toFixed(4);

	return (
		<div className="flex justify-between items-center">
			<div className="flex items-center">
				<div
					className={pinned ? pinnedStyle : unpinnedStyle}
					onClick={e => handlePinnedChange(e)}
				/>
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
