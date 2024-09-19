import type { GenericAllPokemon } from 'models/genericModels';

export const fetchAllPokemon = async (): Promise<GenericAllPokemon> => {
	const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=9999');
	return await response.json();
};
