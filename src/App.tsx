import { Box } from '@mui/material';
import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { Home } from 'components/Home';
import { Runner } from 'components/Runner';
import { CustomSnackbar } from 'components/custom/CustomSnackbar';
import { PokemonListContext } from 'contexts/PokemonListContext';
import { SnackbarContext } from 'contexts/SnackbarContext';
import 'css/App.css';
import { runnerPokemon } from 'data';
import React, { useEffect, useState } from 'react';
import { useOutlet } from 'react-router-dom';

export const App = (): React.JSX.Element => {
	const outlet = useOutlet();

	const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
	const [snackbarMessage, setSnackbarMessage] = useState<string>('');
	const [snackbarColor, setSnackbarColor] = useState<'success' | 'info' | 'warning' | 'error'>('info');

	const [pokemonList, setPokemonList] = useState<string[]>(() => {
		const list = localStorage.getItem('pokemon-directory-list');

		return (list !== null) ? JSON.parse(list) : [];
	});

	useEffect(() => {
		localStorage.setItem('pokemon-directory-list', JSON.stringify(pokemonList));
	}, [pokemonList]);

	return (
		<Box id='pokemon-directory'>
			<SnackbarContext.Provider value={{ snackbarOpen, setSnackbarOpen, snackbarMessage, setSnackbarMessage, snackbarColor, setSnackbarColor }}>
				<PokemonListContext.Provider value={{ pokemonList, setPokemonList }}>
					<Runner leftPokemon={runnerPokemon.topLeft} rightPokemon={runnerPokemon.topRight}>
						<Header />
					</Runner>
					{outlet ?? (
						<Home />
					)}
					<CustomSnackbar />
					<Runner leftPokemon={runnerPokemon.bottomLeft} rightPokemon={runnerPokemon.bottomRight}>
						<Footer />
					</Runner>
				</PokemonListContext.Provider>
			</SnackbarContext.Provider>
		</Box>
	);
};
