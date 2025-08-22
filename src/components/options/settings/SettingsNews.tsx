import { NEWS_SOURCES } from '../../../constants/newsSources';
import { NewsSourceContext } from '../../../App';
import { use, useCallback } from 'react';
import { setNewsSourceSettings } from './settingsUtils';

export const newsSourceUrls: { source: string; url: string; page: string }[] = [
	{
		source: NEWS_SOURCES[0],
		url: 'src/assets/logos/idnes-logo.svg',
		page: 'https://www.idnes.cz/',
	},
	{
		source: NEWS_SOURCES[1],
		url: 'src/assets/logos/ct24-logo.svg',
		page: 'https://ct24.ceskatelevize.cz/',
	},
];

const SettingsNews = () => {
	const { currentNewsSource, setCurrentNewSource } = use(NewsSourceContext);

	const handleNewsSourceChange = useCallback(
		(source: string) => {
			setCurrentNewSource(source);
		},
		[setNewsSourceSettings(currentNewsSource)]
	);

	return (
		<>
			<h1 className="my-4 px-7 text-2xl">Zdroj zpráv</h1>
			<div className="flex px-6">
				{newsSourceUrls.map(newsSourceUrl => (
					<li
						className={
							'w-45 h-20 mx-2 hover:cursor-pointer hover:outline-2 list-none flex ' +
							(newsSourceUrl.source === currentNewsSource
								? 'outline-2'
								: 'outline-0')
						}
						key={newsSourceUrl.source}
						onClick={() => {
							handleNewsSourceChange(newsSourceUrl.source);
						}}
					>
						<img src={newsSourceUrl.url} />
					</li>
				))}
			</div>
		</>
	);
};

export default SettingsNews;
