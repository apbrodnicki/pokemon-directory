import { getPokemonAutocompleteItem } from 'helper/filterApiData';
import { type PokemonAutocompleteItem } from 'models/models';
import type React from 'react';
import { useEffect, useState } from 'react';
import { fetchPokemon } from './fetchPokemon';

interface useFetchPokemonAutocompleteItemsProps {
	pokemonList: string[],
	setIsLoadingPokemonAutocompleteItems: React.Dispatch<React.SetStateAction<boolean>>
}

export const useFetchPokemonAutocompleteItems = (
	{ pokemonList, setIsLoadingPokemonAutocompleteItems }: useFetchPokemonAutocompleteItemsProps
): PokemonAutocompleteItem[] => {
	const [pokemonAutocompleteItems, setPokemonAutocompleteItems] = useState<PokemonAutocompleteItem[]>([]);

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			try {
				const promises = pokemonList.map(async (mon: string) => await fetchPokemon(mon));
				const pokemonData = await Promise.all(promises);
				const filteredPokemonAutocompleteItems = pokemonData.map(getPokemonAutocompleteItem);
				setPokemonAutocompleteItems(filteredPokemonAutocompleteItems);
			} catch (error) {
				console.log('Error fetching Pokémon Autocomplete items ->', error);
			} finally {
				setIsLoadingPokemonAutocompleteItems(false);
			}
		};

		void fetchData();
	}, [pokemonList, setIsLoadingPokemonAutocompleteItems]);

	return pokemonAutocompleteItems;
};
