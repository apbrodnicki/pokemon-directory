import { Box, Grid, Paper, Typography } from '@mui/material';
import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
// import { MoveLookup } from 'components/MoveLookup';
import { PokemonDataGrid } from 'components/PokemonDataGrid';
import { UpdatePokemon } from 'components/UpdatePokemon';
import { CustomSnackbar } from 'components/custom/CustomSnackbar';
import { PokemonListContext } from 'contexts/PokemonListContext';
import { SnackbarContext } from 'contexts/SnackbarContext';
import React, { useEffect, useState } from 'react';
import './App.css';

export const App = (): React.JSX.Element => {
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
		<Box id="pokemon-directory">
			<SnackbarContext.Provider value={{ snackbarOpen, setSnackbarOpen, snackbarMessage, setSnackbarMessage, snackbarColor, setSnackbarColor }}>
				<PokemonListContext.Provider value={{ pokemonList, setPokemonList }}>
					<Header />
					<Box
						display='flex'
						flexDirection='column'
						justifyContent='center'
						flex={1}
					>
						<Box
							display='flex'
							alignItems='center'
						>
							<UpdatePokemon />
							{/* <MoveLookup /> */}
						</Box>
						{pokemonList.length > 0 ? (
							<PokemonDataGrid />
						) : (
							<Grid container justifyContent='center'>
								<Grid item maxWidth='90%'>
									<Paper
										elevation={3}
										sx={{
											m: 5,
											backgroundColor: '#B8D8D8'
										}}>
										<Box p={5}>
											<Typography align='center'>
													Add Pokémon to learn more about them!
											</Typography>
										</Box>
									</Paper>
								</Grid>
							</Grid>
						)}
					</Box>
					<CustomSnackbar />
					<Footer />
				</PokemonListContext.Provider>
			</SnackbarContext.Provider>
		</Box>
	);
};
