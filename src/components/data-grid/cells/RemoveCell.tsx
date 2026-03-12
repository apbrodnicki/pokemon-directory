import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';
import { Box } from '@mui/material';
import { CustomTooltip } from 'components/custom/CustomTooltip';
import { PokemonListContext } from 'contexts/PokemonListContext';
import { SnackbarContext } from 'contexts/SnackbarContext';
import React, { useContext } from 'react';

interface RemoveCellProps {
	name: string;
}

export const RemoveCell = ({ name }: RemoveCellProps): React.JSX.Element => {
	const { setSnackbarOpen, setSnackbarMessage, setSnackbarColor } = useContext(SnackbarContext);
	const { pokemonList, setPokemonList } = useContext(PokemonListContext);

	const onIconClick = (): void => {
		setPokemonList(pokemonList.filter((pokemon) => pokemon !== name));
		setSnackbarMessage('Success: Pokémon removed.');
		setSnackbarColor('success');
		setSnackbarOpen(true);
	};

	return (
		<CustomTooltip title='Remove Pokémon from list.'>
			<Box sx={{ cursor: 'pointer' }}>
				<RemoveCircleTwoToneIcon onClick={onIconClick} />
			</Box>
		</CustomTooltip>
	);
};
