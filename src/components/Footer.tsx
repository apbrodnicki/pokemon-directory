import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, Link as MuiLink, Paper, Typography } from '@mui/material';
import { useFetchSprite } from 'api/useFetchSprite';
import pokeApiLogo from 'assets/pokeapi-logo.svg';
import { CustomTooltip } from 'components/custom/CustomTooltip';
import { PokemonListContext } from 'contexts/PokemonListContext';
import { useUpdatePokemonList, type updatePokemonListProps } from 'hooks/useUpdatePokemonList';
import React, { useContext } from 'react';

export const Footer = (): React.JSX.Element => {
	const { pokemonList } = useContext(PokemonListContext);

	const updatePokemonList = useUpdatePokemonList();

	const onClick = (name: string): void => {
		let action: updatePokemonListProps['action'] = 'add';
		if (pokemonList.includes(name)) {
			action = 'remove';
		}

		updatePokemonList({ action, pokemonInput: [name], setPokemonInput: () => { } });
	};

	return (
		<Paper elevation={3} sx={{ m: 2, p: 4, backgroundColor: '#7A9E9f' }}>
			<Box
				sx={{
					display: 'flex',
					alignItems: 'center',
					justifyContent: 'center',
				}}
			>
				<Box display={{ sm: 'block', xs: 'none' }}>
					<CustomTooltip
						title='Rampardos - Click to add or remove.'
						haveCursor
						onClick={() => { onClick('rampardos'); }}
					>
						<Box
							component='img'
							src={useFetchSprite('rampardos')}
							alt='rampardos'
							mx={2}
						/>
					</CustomTooltip>
				</Box>
				<Box>
					<Box display='flex' alignItems='center' justifyContent='center'>
						<Typography variant='subtitle2' mx={1}>
							Created by Alex Brodnicki
						</Typography>
						<MuiLink href='https://github.com/apbrodnicki' target='_blank' mx={1}>
							<CustomTooltip title='My GitHub'>
								<GitHubIcon fontSize='large' />
							</CustomTooltip>
						</MuiLink>
					</Box>
					<Box display='flex' alignItems='center' justifyContent='center'>
						<Typography variant='subtitle2' mx={1}>
							Data provided by PokéApi
						</Typography>
						<MuiLink href='https://pokeapi.co/' target='_blank' underline='hover' color='black' mx={1}>
							<CustomTooltip title='PokéApi Website'>
								<Box
									component='img'
									src={pokeApiLogo}
									alt='PokéApi logo'
									width='62.5px'
									height='25px'
								/>
							</CustomTooltip>
						</MuiLink>
					</Box>
				</Box>
				<Box display={{ sm: 'block', xs: 'none' }}>
					<CustomTooltip
						title='Omastar - Click to add or remove.'
						haveCursor
						onClick={() => { onClick('omastar'); }}
					>
						<Box
							component='img'
							src={useFetchSprite('omastar')}
							alt='omastar'
							mx={2}
						/>
					</CustomTooltip>
				</Box>
			</Box>
		</Paper >
	);
};
