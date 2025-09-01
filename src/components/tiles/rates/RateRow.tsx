import { use } from 'react';
import { SettingsContext } from '../../../App';
import {
	getPinnedCryptosSettings,
	getPinnedCurrenciesSettings,
	setPinnedCryptosSettings,
	setPinnedCurrenciesSettings,
} from '../../options/settings/settingsUtils';
import type { TypeRateSource } from './RateTile';

type TypeRateRowProps = {
	code: string;
	name: string;
	value: number;
	pinned: boolean;
	source: TypeRateSource;
};

export const formatRate = (value: string): string => {
	return (
		value.split('.')[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ') +
		',' +
		value.split('.')[1]
	);
};

const setRates = (
	currentRates: string[],
	rateCode: string | undefined,
	source: TypeRateSource,
	e: React.MouseEvent<HTMLDivElement>
) => {
	if (currentRates.includes(rateCode as string)) {
		if (source === 'currency')
			setPinnedCurrenciesSettings(
				currentRates.filter(item => item !== rateCode)
			);
		if (source === 'crypto')
			setPinnedCryptosSettings(currentRates.filter(item => item !== rateCode));

		(e.target as HTMLDivElement).classList.add('pinned');
	}

	if (!currentRates.includes(rateCode as string)) {
		currentRates.push(rateCode as string);

		if (source === 'currency') setPinnedCurrenciesSettings(currentRates.sort());
		if (source === 'crypto') setPinnedCryptosSettings(currentRates.sort());

		(e.target as HTMLDivElement).classList.remove('pinned');
	}
};

const RateRow = ({ code, name, value, pinned, source }: TypeRateRowProps) => {
	const { baseCurrency, baseCrypto } = use(SettingsContext);
	let fixedValue: string;
	const pinnedStyle: string =
		'bg-[url(src/assets/icons/star-selected-icon.svg)] mr-3 bg-no-repeat bg-center bg-cover h-5 w-5 hover:cursor-pointer hover:bg-[url(src/assets/icons/star-icon.svg)]';
	const unpinnedStyle: string =
		'bg-[url(src/assets/icons/star-icon.svg)] mr-3 bg-no-repeat bg-center bg-cover h-5 w-5 hover:cursor-pointer hover:bg-[url(src/assets/icons/star-selected-icon.svg)]';

	const handlePinnedChange = (e: React.MouseEvent<HTMLDivElement>): void => {
		const rateCode: string | undefined = (e.target as HTMLDivElement).closest(
			'li'
		)?.id;

		const currentPinnedRates: string[] =
			source === 'currency'
				? (getPinnedCurrenciesSettings() as string[])
				: (getPinnedCryptosSettings() as string[]);

		setRates(currentPinnedRates, rateCode, source, e);
	};

	fixedValue = value.toFixed(2);
	if (value.toFixed(2) === '0.00') fixedValue = value.toFixed(3);
	if (value.toFixed(3) === '0.000') fixedValue = value.toFixed(4);

	return (
		<li className="my-3 mx-4" id={code} key={code}>
			<div className="flex justify-between items-center">
				<div className="flex items-center">
					<div
						className={pinned ? pinnedStyle : unpinnedStyle}
						onClick={e => handlePinnedChange(e)}
					/>
					<div>
						<div className="font-bold 2xl:font-normal 2xl:text-2xl">{code}</div>
						<div>{name}</div>
					</div>
				</div>
				<div className="2xl:text-2xl">{`${formatRate(fixedValue)} ${
					source === 'currency' ? baseCurrency : baseCrypto
				}`}</div>
			</div>
		</li>
	);
};

export default RateRow;
