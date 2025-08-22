import { use, useEffect, useState } from 'react';
import { fetchFeed, type TypeFetchFeed } from './newsUtils';
import Loader from '../../layout/Loader';
import { NewsSourceContext } from '../../../App';
import { newsSourceUrls } from '../../options/settings/SettingsNews';

const NewsTile = () => {
	const { currentNewsSource } = use(NewsSourceContext);

	const [feed, setFeed] = useState<TypeFetchFeed>();
	const [isFeedLoading, setIsFeedLoading] = useState<boolean>(true);

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
			{'Nepodařilo se načíst zprávy. Chyba: ' + feed?.error}
		</p>
	) : isFeedLoading ? (
		<Loader size={7} />
	) : (
		<div className="p-4 list-none overflow-y-scroll">
			<a
				href={newsSourceUrls.find(n => n.source === currentNewsSource)?.page}
				target="_blank"
			>
				<img
					className="h-8 mt-2 mb-6 ml-[-0.75rem]"
					src={newsSourceUrls.find(n => n.source === currentNewsSource)?.url}
				/>
			</a>
			{feed?.news.map(article => {
				return (
					<li className="my-3" key={article.guid}>
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
	);
};

export default NewsTile;
