import { Box, Paper } from '@mui/material';
import { useFetchSprite } from 'api/useFetchSprite';
import { PokemonListContext } from 'contexts/PokemonListContext';
import { formatName } from 'helper/helper';
import { useUpdatePokemonList, type updatePokemonListProps } from 'hooks/useUpdatePokemonList';
import React, { useContext } from 'react';
import { CustomTooltip } from './custom/CustomTooltip';

interface RunnerProps {
	leftPokemon: string;
	rightPokemon: string;
	children: React.PropsWithChildren<React.JSX.Element>;
}

export const Runner = ({ leftPokemon, rightPokemon, children }: RunnerProps): React.JSX.Element => {
	const { pokemonList } = useContext(PokemonListContext);
	const updatePokemonList = useUpdatePokemonList();

	const leftSprite = useFetchSprite(leftPokemon);
	const rightSprite = useFetchSprite(rightPokemon);

	const onClick = (name: string): void => {
		let action: updatePokemonListProps['action'] = 'add';
		if (pokemonList.includes(name)) {
			action = 'remove';
		}

		updatePokemonList({ action, pokemonInput: [name], setPokemonInput: () => { } });
	};

	return (
		<Box id='runner'>
			<Paper elevation={3} sx={{ m: 2, p: 1, backgroundColor: '#7A9E9f' }}>
				<Box
					sx={{
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
					}}
				>
					<Box display={{ xs: 'none', sm: 'block' }}>
						{leftSprite !== '' && (
							<CustomTooltip
								title={`${formatName(leftPokemon)} - Click to add or remove.`}
								haveCursor
								onClick={() => { onClick(leftPokemon); }}
							>
								<Box
									component='img'
									src={leftSprite}
									alt={`${formatName(leftPokemon)}`}
									mx={2}
								/>
							</CustomTooltip>
						)}
					</Box>
					{children}
					<Box display={{ xs: 'none', sm: 'block' }}>
						{rightSprite !== '' && (
							<CustomTooltip
								title={`${formatName(rightPokemon)} - Click to add or remove.`}
								haveCursor
								onClick={() => { onClick(rightPokemon); }}
							>
								<Box
									component='img'
									src={rightSprite}
									alt={`${formatName(rightPokemon)}`}
									mx={2}
								/>
							</CustomTooltip>
						)}
					</Box>
				</Box>
			</Paper>
		</Box>
	);
};
