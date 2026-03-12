import { SnackbarContext } from 'contexts/SnackbarContext';
import { defaultItem } from 'data';
import { filterItemData } from 'helper/filterApiData';
import type { GenericItem } from 'models/genericModels';
import type { Item } from 'models/models';
import type React from 'react';
import { useContext, useState } from 'react';
import { fetchItem } from './fetchItem';

interface useFetchItemReturn {
	fetchItemRequest: (
		{ itemName, setIsLoading } : fetchItemRequestProps
	) => void;
	item: Item;
	setItem: React.Dispatch<React.SetStateAction<Item>>;
}

interface fetchItemRequestProps {
	itemName: string;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useFetchItem = (): useFetchItemReturn => {
	const { setSnackbarOpen, setSnackbarMessage, setSnackbarColor } = useContext(SnackbarContext);

	const [item, setItem] = useState<Item>(defaultItem);

	const fetchItemRequest = (
		{ itemName, setIsLoading } : fetchItemRequestProps
	): void => {
		void fetchItem(itemName)
			.then((response: GenericItem) => response)
			.then((result: GenericItem) => { setItem(filterItemData(result)); })
			.catch(() => {
				setSnackbarMessage('Error: Invalid input value.');
				setSnackbarColor('error');
				setSnackbarOpen(true);
			})
			.finally(() => { setIsLoading(false); });
	};

	return { fetchItemRequest, item, setItem };
};
