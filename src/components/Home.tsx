import { Box, Paper, Typography } from '@mui/material';
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
			alignItems='center'
			flex={1}
		>
			<Box
				display='flex'
				alignItems='center'
				flexDirection='column'
				mb={5}
				width='100%'
			>
				<Lookup />
				<UpdatePokemon />
			</Box>
			{pokemonList.length > 0 ? (
				<PokemonDataGrid />
			) : (
				<Paper
					elevation={3}
					sx={{
						m: 5,
						width: { xs: '67%', md: '33%' },
						backgroundColor: '#B8314F',
						display: 'flex',
						justifyContent: 'center',
						alignItems: 'center'
					}}>
					<Box p={3}>
						<Typography variant='subtitle2' align='center'>
							Add Pokémon to learn more about them or lookup information about abilities/items/moves/types!
						</Typography>
					</Box>
				</Paper>
			)}
		</Box>
	);
};
