import { Box, FormControlLabel, Radio, RadioGroup } from '@mui/material';
import { useFetchAbility } from 'api/abilities/useFetchAbility';
import { useFetchItem } from 'api/items/useFetchItem';
import { useFetchContactMovesHtml } from 'api/moves/useFetchContactMovesHtml';
import { useFetchMove } from 'api/moves/useFetchMove';
import { PokeballLoader } from 'components/loaders/PokeballLoader';
import { SnackbarContext } from 'contexts/SnackbarContext';
import 'css/PokeballLoader.css';
import { defaultAbility, defaultItem, defaultMove } from 'data';
import { formatNameForApi } from 'helper/helper';
import type { LookupType } from 'models/models';
import React, { useContext, useEffect, useState } from 'react';
import { AbilityDialog } from './dialogs/AbilityDialog';
import { ItemDialog } from './dialogs/ItemDialog';
import { MoveDialog } from './dialogs/MoveDialog';
import { LookupForm } from './LookupForm';

export const Lookup = (): React.JSX.Element => {
	const { setSnackbarOpen, setSnackbarMessage, setSnackbarColor } = useContext(SnackbarContext);

	const [input, setInput] = useState<string>('');
	const [lookupType, setLookupType] = useState<LookupType['lookupType']>('ability');

	const [isAbilityDialogOpen, setIsAbilityDialogOpen] = useState<boolean>(false);
	const [isItemDialogOpen, setIsItemDialogOpen] = useState<boolean>(false);
	const [isMoveDialogOpen, setIsMoveDialogOpen] = useState<boolean>(false);

	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);

	const { fetchAbilityRequest, ability, setAbility } = useFetchAbility();
	const { fetchItemRequest, item, setItem } = useFetchItem();
	const { fetchMoveRequest, move, setMove } = useFetchMove();
	const contactMoves = useFetchContactMovesHtml();

	const onLookupInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setInput(event.target.value);
	};

	const onRadioGroupChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setLookupType(event.target.value as LookupType['lookupType']);
	};

	const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();

		if (input.length < 1) {
			setSnackbarMessage('Error: Input value is empty.');
			setSnackbarColor('error');
			setSnackbarOpen(true);

			return;
		}

		setIsLoading(true);

		switch (lookupType) {
			case 'ability':
				fetchAbilityRequest({ abilityName: formatNameForApi(input), setIsLoading, setIsError });
				break;
			case 'item':
				fetchItemRequest({ itemName: formatNameForApi(input), setIsLoading, setIsError });
				break;
			case 'move':
				fetchMoveRequest({ moveName: formatNameForApi(input), contactMoves, setIsLoading, setIsError });
				break;

		}
	};

	useEffect(() => {
		if (isError) {
			setSnackbarMessage('Error: Invalid input value.');
			setSnackbarColor('error');
			setSnackbarOpen(true);
		}

		if (ability !== defaultAbility) {
			setIsAbilityDialogOpen(true);
		}

		if (item !== defaultItem) {
			setIsItemDialogOpen(true);
		}

		if (move !== defaultMove) {
			setIsMoveDialogOpen(true);
		}

		setIsError(false);
		setInput('');
	}, [ability, item, move, isError, setSnackbarColor, setSnackbarMessage, setSnackbarOpen]);

	return (
		<Box
			display='flex'
			flexDirection='column'
			alignItems='center'
			flex='1'
			mx={3}
		>
			{!isLoading ? (
				<>
					<LookupForm label='Lookup' onSubmit={onSubmit} onChange={onLookupInputChange} />
					<RadioGroup
						defaultValue='ability'
						row
						onChange={onRadioGroupChange}
						sx={{
							flexWrap: 'nowrap'
						}}
					>
						<FormControlLabel value='ability' control={<Radio />} label='Ability' />
						<FormControlLabel value='item' control={<Radio />} label='Item' />
						<FormControlLabel value='move' control={<Radio />} label='Move' />
					</RadioGroup>
					<AbilityDialog ability={ability} setAbility={setAbility} isAbilityDialogOpen={isAbilityDialogOpen} setIsAbilityDialogOpen={setIsAbilityDialogOpen} />
					<ItemDialog item={item} setItem={setItem} isItemDialogOpen={isItemDialogOpen} setIsItemDialogOpen={setIsItemDialogOpen} />
					<MoveDialog move={move} setMove={setMove} isMoveDialogOpen={isMoveDialogOpen} setIsMoveDialogOpen={setIsMoveDialogOpen} />
				</>
			) : (
				<PokeballLoader />
			)}
		</Box>
	);
};
