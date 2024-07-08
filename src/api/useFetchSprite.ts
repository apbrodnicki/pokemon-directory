import { getSprite } from 'helper/filterApiData';
import { type GenericPokemon } from 'models/genericModels';
import { useEffect, useState } from 'react';
import { fetchPokemon } from './fetchPokemon';

export const useFetchSprite = (name: string): string => {
	const [sprite, setSprite] = useState<string>('');

	useEffect(() => {
		void fetchPokemon(name)
			.then((response: GenericPokemon) => response)
			.then((result: GenericPokemon) => { setSprite(getSprite(result)); });
	}, [name]);

	return sprite;
};
