import { use } from 'react';
import { SettingsContext } from '../../../App';
import {
	getPinnedCryptosSettings,
	getPinnedCurrenciesSettings,
} from '../../options/settings/settingsUtils';
import type { TypeRateSource } from './RateTile';
import { formatRate, setDisplayedValue, setPinnedRates } from './ratesUtils';
import starSelectedIcon from '../../../assets/icons/star-selected-icon.svg';
import starIcon from '../../../assets/icons/star-icon.svg';

type TypeRateRowProps = {
	code: string;
	name: string;
	value: number;
	pinned: boolean;
	source: TypeRateSource;
};

/*
 *	Component that displays a row with a currency or cryptocurrency information.
 *	@typedef {object} TypeRateRowProps
 *	@property {string} code – The code of the rate.
 *	@property {string} name – The name of the rate.
 *	@property {number} value – The value of the rate.
 *	@property {boolean} pinned – If the rate is pinned.
 *	@property {TypeRateSource} source – The source of the rate.
 *	@returns {JSX:Element}
 */
const RateRow = ({ code, name, value, pinned, source }: TypeRateRowProps) => {
	const { baseCurrency, baseCrypto } = use(SettingsContext);

	/*
	 *	Function that sets the rate row to be either pinned or unpinned on click of the star icon.
	 *  @param {React.MouseEvent<HTMLDivElement>} e – Event of the clicked element.
	 *	@returns {void}
	 */
	const handlePinnedChange = (e: React.MouseEvent<HTMLDivElement>): void => {
		const rateCode: string | undefined = (e.target as HTMLDivElement).closest(
			'li'
		)?.id;

		const currentPinnedRates: string[] =
			source === 'currency'
				? (getPinnedCurrenciesSettings() as string[])
				: (getPinnedCryptosSettings() as string[]);

		setPinnedRates(currentPinnedRates, rateCode, source, e);
	};

	return (
		<li className="my-3 mx-4" id={code} key={code}>
			<div className="flex justify-between items-center">
				<div className="flex items-center">
					<div
						className="mr-3 bg-no-repeat bg-center bg-cover h-5 w-5 hover:cursor-pointer"
						onClick={e => handlePinnedChange(e)}
						onMouseEnter={e => {
							e.currentTarget.style.backgroundImage = pinned
								? `url("${starIcon}")`
								: `url("${starSelectedIcon}")`;
						}}
						onMouseLeave={e =>
							(e.currentTarget.style.backgroundImage = pinned
								? `url("${starSelectedIcon}")`
								: `url("${starIcon}")`)
						}
						style={
							pinned
								? { backgroundImage: `url("${starSelectedIcon}")` }
								: { backgroundImage: `url("${starIcon}")` }
						}
					/>
					<div>
						<div className="font-bold 2xl:font-normal 2xl:text-2xl">{code}</div>
						<div>{name}</div>
					</div>
				</div>
				<div className="2xl:text-2xl">{`${formatRate(
					setDisplayedValue(value)
				)} ${source === 'currency' ? baseCurrency : baseCrypto}`}</div>
			</div>
		</li>
	);
};

export default RateRow;
