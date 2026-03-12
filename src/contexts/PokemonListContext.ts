import type React from 'react';
import { createContext } from 'react';

interface PokemonListContextProps {
	pokemonList: string[];
	setPokemonList: React.Dispatch<React.SetStateAction<string[]>>;
}

export const PokemonListContext = createContext<PokemonListContextProps>({
	pokemonList: [],
	setPokemonList: () => {}
});
