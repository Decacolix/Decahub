import { use, useEffect, useState } from 'react';
import { fetchFeed, type TypeFetchFeed } from './newsUtils';
import Loader from '../../layout/Loader';
import { SettingsContext } from '../../../App';
import { newsSourceUrls } from '../../options/settings/SettingsNews';
import { getLanguageSettings } from '../../options/settings/settingsUtils';

/*
 *	Component that displays a list of current news based on the selected news source.
 *	@returns {JSX:Element}
 */
const NewsTile = () => {
	const { currentNewsSource } = use(SettingsContext);

	const [feed, setFeed] = useState<TypeFetchFeed>();
	const [isFeedLoading, setIsFeedLoading] = useState<boolean>(true);

	/*
	 *	Hook that handles fetching the feed when the current news source changes.
	 */
	useEffect(() => {
		setIsFeedLoading(true);
		const fetchFeedOnLoad = async () => {
			const feedFetched = await fetchFeed(currentNewsSource);
			setFeed(feedFetched);
			setIsFeedLoading(false);
		};

		fetchFeedOnLoad();
	}, [currentNewsSource]);

	return feed?.failed ? (
		<p className="p-4">
			{(getLanguageSettings() === 'cs'
				? 'Nepodařilo se načíst zprávy. Chyba: '
				: 'Could not load the news. Error: ') + feed?.error}
		</p>
	) : isFeedLoading ? (
		<Loader />
	) : (
		<>
			<div className="my-6 ml-4 flex-1 mr-auto">
				<a
					href={newsSourceUrls.find(n => n.source === currentNewsSource)?.page}
					target="_blank"
				>
					<img
						className="h-8"
						src={newsSourceUrls.find(n => n.source === currentNewsSource)?.url}
					/>
				</a>
			</div>
			<div className="list-none overflow-y-scroll w-[100%]">
				{feed?.news.map(article => {
					return (
						<li className="my-3 mx-4" key={article.guid}>
							<a
								className="flex justify-between items-center hover:underline"
								href={article.link}
								target="_blank"
							>
								<p>{article.title}</p>
								<div className="bg-[url(./assets/icons/link-icon.svg)] bg-no-repeat bg-center min-w-3 min-h-3 ml-3" />
							</a>
							<p className="text-xs text-gray-300">{`${article.date.getDate()}. ${
								article.date.getMonth() + 1
							} ${article.date.getFullYear()}, ${article.date
								.getHours()
								.toString()
								.padStart(2, '0')}:${article.date
								.getMinutes()
								.toString()
								.padStart(2, '0')}`}</p>
						</li>
					);
				})}
			</div>
		</>
	);
};

export default NewsTile;
