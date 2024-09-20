import type { GenericItem } from 'models/genericModels';

export const fetchItem = async (item: string): Promise<GenericItem> => {
	const response = await fetch('https://pokeapi.co/api/v2/item/' + item);
	return await response.json();
};
