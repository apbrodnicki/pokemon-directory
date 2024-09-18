import type { GenericMove } from 'models/genericModels';

export const fetchMove = async (move: string): Promise<GenericMove> => {
	const response = await fetch('https://pokeapi.co/api/v2/move/' + move);
	return await response.json();
};
