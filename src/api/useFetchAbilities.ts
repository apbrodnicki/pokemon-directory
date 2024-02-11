import { useEffect, useState } from 'react';
import { fetchAbilities } from './fetchAbilities';
import { filterPokemonAbilities } from 'helper';
import { type GenericAbilities } from 'models/genericModels';

export const useFetchAbilities = (): string[] => {
	const [abilities, setAbilities] = useState<string[]>([]);

	useEffect(() => {
		void fetchAbilities()
			.then((response: GenericAbilities) => response)
			.then((result: GenericAbilities) => { setAbilities(filterPokemonAbilities(result)); });
	}, []);

	return abilities;
};
