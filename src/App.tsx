import { Box, Grid, Paper, Typography } from '@mui/material';
import { Footer } from 'components/Footer';
import { Header } from 'components/Header';
import { PokemonDataGrid } from 'components/PokemonDataGrid';
import { UpdatePokemon } from 'components/UpdatePokemon';
import { CustomSnackbar } from 'components/custom/CustomSnackbar';
import { PokemonListContext } from 'contexts/PokemonListContext';
import { SnackbarContext } from 'contexts/SnackbarContext';
import React, { useState } from 'react';
import { useOutlet } from 'react-router-dom';
// TODO:
// Add option to add pokemon icons from header/footer into data grid.
// Add custom theme.
// Add virtualization to autocomplete to improve loading
// Add sprites and pokedex number into autocomplete and improve styling
// Add custom row ordering for data grid
export const App = (): React.JSX.Element => {
	const outlet = useOutlet();

	const [snackbarOpen, setSnackbarOpen] = useState<boolean>(false);
	const [snackbarMessage, setSnackbarMessage] = useState<string>('');
	const [snackbarColor, setSnackbarColor] = useState<'success' | 'info' | 'warning' | 'error'>('success');

	const [pokemonList, setPokemonList] = useState<string[]>(() => {
		const list = localStorage.getItem('pokemon-directory-list');

		return (list !== null) ? JSON.parse(list) : [];
	});

	return (
		<>
			<Header />
			{outlet ?? (
				<SnackbarContext.Provider value={{ snackbarOpen, setSnackbarOpen, snackbarMessage, setSnackbarMessage, snackbarColor, setSnackbarColor }}>
					<PokemonListContext.Provider value={{ pokemonList, setPokemonList }}>
						<Box
							display='flex'
							flexDirection='column'
							justifyContent='center'
							flex={1}>
							<UpdatePokemon />
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
												Add some Pokémon to learn more about them!
												</Typography>
											</Box>
										</Paper>
									</Grid>
								</Grid>
							)}
						</Box>
					</PokemonListContext.Provider>
					<CustomSnackbar />
				</SnackbarContext.Provider>
			)}
			<Footer />
		</>
	);
};
