export type TypeFetchFeed = {
	failed: boolean;
	error: string;
	news: {
		guid: string;
		title: string;
		link: string;
		date: Date;
	}[];
};

/* Fetch the RSS feed data using the currently selected news source URL. */
export const fetchFeed = async (source: string): Promise<TypeFetchFeed> => {
	let result: TypeFetchFeed = {
		failed: true,
		error: 'fetch',
		news: [],
	};

	const numberOfNews: number = 10;

	await fetch(source)
		.then(response => response.text())
		.then(data => {
			const xmlParser: DOMParser = new DOMParser();
			const xmlData: Document = xmlParser.parseFromString(
				data,
				'application/xml'
			);

			const guids: NodeListOf<Element> =
				xmlData.querySelectorAll('channel item guid');
			const titles: NodeListOf<Element> =
				xmlData.querySelectorAll('channel item title');
			const links: NodeListOf<Element> =
				xmlData.querySelectorAll('channel item link');
			const dates: NodeListOf<Element> = xmlData.querySelectorAll(
				'channel item pubDate'
			);

			const news: {
				guid: string;
				title: string;
				link: string;
				date: Date;
			}[] = [];

			for (let i = 0; i < numberOfNews; i++) {
				news.push({
					guid: guids[i].textContent,
					title: titles[i].textContent,
					link: links[
						source === 'https://rss.nytimes.com/services/xml/rss/nyt/World.xml'
							? i * 2
							: i
					].textContent,
					date: new Date(Date.parse(dates[i].textContent)),
				});
			}

			result = {
				failed: false,
				error: '',
				news: news,
			};
		})
		.catch(error => {
			result = {
				failed: true,
				error: error,
				news: [],
			};
		});

	return result;
};
