import { filterPokemonData } from 'helper/filterApiData';
import { type Pokemon } from 'models/models';
import type React from 'react';
import { useEffect, useState } from 'react';
import { fetchPokemon } from './fetchPokemon';

interface useFetchPokemonProps {
	pokemonList: string[],
	setIsLoadingPokemon: React.Dispatch<React.SetStateAction<boolean>>
}

export const useFetchPokemon = (
	{ pokemonList, setIsLoadingPokemon }: useFetchPokemonProps
): Pokemon[] => {
	const [pokemon, setPokemon] = useState<Pokemon[]>([]);

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			try {
				const promises = pokemonList.map(async (mon: string) => await fetchPokemon(mon));
				const pokemonData = await Promise.all(promises);
				const filteredPokemon = pokemonData.map(filterPokemonData);
				setPokemon(filteredPokemon);
			} catch (error) {
				console.log('Error fetching Pokémon ->', error);
			} finally {
				setIsLoadingPokemon(false);
			}
		};

		void fetchData();
	}, [pokemonList, setIsLoadingPokemon]);

	return pokemon;
};
