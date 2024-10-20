import { Box, Grid, Paper, Typography } from '@mui/material';
import { PokemonListContext } from 'contexts/PokemonListContext';
import React, { useContext } from 'react';
import { PokemonDataGrid } from './data-grid/PokemonDataGrid';
import { Lookup } from './lookup/Lookup';
import { UpdatePokemon } from './UpdatePokemon';

export const Home = (): React.JSX.Element => {
	const { pokemonList } = useContext(PokemonListContext);

	return (
		<Box
			display='flex'
			flexDirection='column'
			justifyContent='center'
			flex={1}
		>
			<Box
				display='flex'
				alignItems='center'
				flexDirection={{ xs: 'column', lg: 'row' }}
				m={3}
			>
				<UpdatePokemon />
				<Lookup />
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
									Add Pokémon to learn more about them or lookup information about abilities/items/moves!
								</Typography>
							</Box>
						</Paper>
					</Grid>
				</Grid>
			)}
		</Box>
	);
};
