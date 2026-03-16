import { Box, FormControlLabel, RadioGroup, type SelectChangeEvent } from '@mui/material';
import { useFetchAbility } from 'api/abilities/useFetchAbility';
import { useFetchItem } from 'api/items/useFetchItem';
import { useFetchContactMovesHtml } from 'api/moves/useFetchContactMovesHtml';
import { useFetchMove } from 'api/moves/useFetchMove';
import { StyledRadioButton } from 'components/custom/Styles';
import { PokeballLoader } from 'components/loaders/PokeballLoader';
import { SnackbarContext } from 'contexts/SnackbarContext';
import 'css/PokeballLoader.css';
import { defaultAbility, defaultItem, defaultMove } from 'data';
import { formatNameForApi } from 'helper/helper';
import type { LookupType, Types } from 'models/models';
import React, { useContext, useState } from 'react';
import { AbilityDialog } from './dialogs/AbilityDialog';
import { ItemDialog } from './dialogs/ItemDialog';
import { MoveDialog } from './dialogs/MoveDialog';
import { TypesDialog } from './dialogs/TypesDialog';
import { LookupForm } from './LookupForm';

export const Lookup = (): React.JSX.Element => {
	const { setSnackbarOpen, setSnackbarMessage, setSnackbarColor } = useContext(SnackbarContext);

	const [input, setInput] = useState<string>('');
	const [typesInput, setTypesInput] = useState<(keyof Types)[]>([]);
	const [lookupType, setLookupType] = useState<LookupType['lookupType']>('ability');

	const [isLookupLoading, setIsLookupLoading] = useState<boolean>(false);
	const [isTypesLookupLoading, setIsTypesLookupLoading] = useState<boolean>(false);
	const isLoading = isLookupLoading || isTypesLookupLoading;

	const { fetchAbilityRequest, ability, setAbility } = useFetchAbility();
	const { fetchItemRequest, item, setItem } = useFetchItem();
	const { fetchMoveRequest, move, setMove } = useFetchMove();
	const contactMoves = useFetchContactMovesHtml();

	const [isTypesDialogOpen, setIsTypesDialogOpen] = useState<boolean>(false);
	const isAbilityDialogOpen = ability !== defaultAbility;
	const isItemDialogOpen = item !== defaultItem;
	const isMoveDialogOpen = move !== defaultMove;

	const onLookupInputChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setInput(event.target.value);
	};

	const onTypesInputChange = (event: SelectChangeEvent<typeof typesInput>): void => {
		const { target: { value } } = event;

		setTypesInput(
			typeof value === 'string' ? value.split(',') as (keyof Types)[] : value
		);
	};

	const onRadioGroupChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setLookupType(event.target.value as LookupType['lookupType']);
	};

	const onSubmit = (event: React.SubmitEvent): void => {
		event.preventDefault();

		if (lookupType !== 'types' && input.length < 1) {
			setSnackbarMessage('Error: Input value is empty.');
			setSnackbarColor('error');
			setSnackbarOpen(true);

			return;
		}

		if (lookupType !== 'types') {
			setIsLookupLoading(true);
		}

		switch (lookupType) {
			case 'ability':
				fetchAbilityRequest({ abilityName: formatNameForApi(input), setIsLoading: setIsLookupLoading });
				break;
			case 'item':
				fetchItemRequest({ itemName: formatNameForApi(input), setIsLoading: setIsLookupLoading });
				break;
			case 'move':
				fetchMoveRequest({ moveName: formatNameForApi(input), contactMoves, setIsLoading: setIsLookupLoading });
				break;
			case 'types':
				setIsTypesLookupLoading(true);
				setIsTypesDialogOpen(true);
				break;
		}

		setInput('');
	};

	return (
		<Box
			display='flex'
			flexDirection='column'
			alignItems='center'
			flex='1'
			m={5}
			width='100%'
		>
			{!isLoading ? (
				<>
					<RadioGroup
						value={lookupType}
						row
						onChange={onRadioGroupChange}
						sx={{
							flexWrap: 'nowrap'
						}}
					>
						<FormControlLabel value='ability' control={<StyledRadioButton />} label='Ability' />
						<FormControlLabel value='item' control={<StyledRadioButton />} label='Item' />
						<FormControlLabel value='move' control={<StyledRadioButton />} label='Move' />
						<FormControlLabel value='types' control={<StyledRadioButton />} label='Types' />
					</RadioGroup>
					<LookupForm
						lookupType={lookupType}
						typesInput={typesInput}
						onSubmit={onSubmit}
						onLookupInputChange={onLookupInputChange}
						onTypesInputChange={onTypesInputChange}
					/>
				</>
			) : (
				<PokeballLoader />
			)}
			<AbilityDialog
				ability={ability}
				setAbility={setAbility}
				isAbilityDialogOpen={isAbilityDialogOpen}
			/>
			<ItemDialog
				item={item}
				setItem={setItem}
				isItemDialogOpen={isItemDialogOpen}
			/>
			<MoveDialog
				move={move}
				setMove={setMove}
				isMoveDialogOpen={isMoveDialogOpen}
			/>
			{isTypesDialogOpen && (
				<TypesDialog
					typesInput={typesInput}
					setTypesInput={setTypesInput}
					isTypesDialogOpen={isTypesDialogOpen}
					setIsTypesDialogOpen={setIsTypesDialogOpen}
					setIsTypesLookupLoading={setIsTypesLookupLoading}
				/>
			)}
		</Box>
	);
};
