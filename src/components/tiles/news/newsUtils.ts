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

			console.log(xmlData);

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
					link: links[i].textContent,
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
