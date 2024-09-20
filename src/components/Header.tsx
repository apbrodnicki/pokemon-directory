import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Box, Button, Paper, Typography } from '@mui/material';
import { useFetchSprite } from 'api/useFetchSprite';
import { PokemonListContext } from 'contexts/PokemonListContext';
import { useUpdatePokemonList, type updatePokemonListProps } from 'hooks/useUpdatePokemonList';
import React, { useContext } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { CustomTooltip } from './custom/CustomTooltip';

export const Header = (): React.JSX.Element => {
	const { pokemonList } = useContext(PokemonListContext);
	const path = useLocation().pathname;

	const updatePokemonList = useUpdatePokemonList();

	const route = path === '/' ? 'lookup' : '/';

	const onClick = (name: string): void => {
		let action: updatePokemonListProps['action'] = 'add';
		if (pokemonList.includes(name)) {
			action = 'remove';
		}

		updatePokemonList({ action, pokemonInput: [name], setPokemonInput: () => { } });
	};

	return (
		<Box id="header">
			<Paper elevation={3} sx={{ m: 2, p: 4, backgroundColor: '#7A9E9f' }}>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<CustomTooltip
						title='Tyrantrum - Click to add or remove.'
						haveCursor
						onClick={() => { onClick('tyrantrum'); }}
					>
						<Box
							component='img'
							src={useFetchSprite('tyrantrum')}
							alt='tyrantrum'
							mx={2}
						/>
					</CustomTooltip>
					<Typography
						color='black'
						align='center'
						sx={{
							typography: {
								sm: 'h3',
								xs: 'h6'
							}
						}}
					>
					Pokémon Directory
					</Typography>
					<CustomTooltip
						title='Armaldo - Click to add or remove.'
						haveCursor
						onClick={() => { onClick('armaldo'); }}
					>
						<Box
							component='img'
							src={useFetchSprite('armaldo')}
							alt='armaldo'
							mx={2}
						/>
					</CustomTooltip>
				</Box>
			</Paper>
			<Box id="path-button">
				<Link to={route}>
					<Button>
						{path === '/' ? (
							<>
								<Typography>
									{route}
								</Typography>
								<NavigateNextIcon />
							</>
						) : (
							<NavigateBeforeIcon />
						)}
					</Button>
				</Link>
			</Box>
		</Box>
	);
};
