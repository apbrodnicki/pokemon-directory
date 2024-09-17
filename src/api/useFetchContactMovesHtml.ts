import { getContactMoves } from 'helper/filterApiData';
import { useEffect, useState } from 'react';
import { fetchContactMovesHtml } from './fetchContactMovesHtml';

export const useFetchContactMovesHtml = (): string[] => {
	const [contactMoves, setContactMoves] = useState<string[]>([]);

	useEffect(() => {
		void fetchContactMovesHtml()
			.then((response: string) => response)
			.then((result) => { setContactMoves(getContactMoves(result)); });
	}, []);

	return contactMoves;
};
