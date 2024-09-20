import { defaultItem } from 'data';
import { filterItemData } from 'helper/filterApiData';
import type { GenericItem } from 'models/genericModels';
import type { Item } from 'models/models';
import type React from 'react';
import { useState } from 'react';
import { fetchItem } from './fetchItem';

interface useFetchItemReturn {
	fetchItemRequest: (
		{ itemName, setIsLoading, setIsError } : fetchItemRequestProps
	) => void,
	item: Item,
	setItem: React.Dispatch<React.SetStateAction<Item>>
}

interface fetchItemRequestProps {
	itemName: string,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
	setIsError: React.Dispatch<React.SetStateAction<boolean>>
}

export const useFetchItem = (): useFetchItemReturn => {
	const [item, setItem] = useState<Item>(defaultItem);

	const fetchItemRequest = (
		{ itemName, setIsLoading, setIsError } : fetchItemRequestProps
	): void => {
		void fetchItem(itemName)
			.then((response: GenericItem) => response)
			.then((result: GenericItem) => { setItem(filterItemData(result)); })
			.catch((error) => {
				console.log(error);
				setIsError(true);
			})
			.finally(() => { setIsLoading(false); });
	};

	return { fetchItemRequest, item, setItem };
};
