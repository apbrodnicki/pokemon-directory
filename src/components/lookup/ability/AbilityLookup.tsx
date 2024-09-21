import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useFetchAbility } from 'api/abilities/useFetchAbility';
import { PokeballLoader } from 'components/loaders/PokeballLoader';
import { SnackbarContext } from 'contexts/SnackbarContext';
import { defaultAbility } from 'data';
import { formatNameForApi } from 'helper/helper';
import React, { useContext, useEffect, useState } from 'react';
import { AbilityDialog } from './AbilityDialog';

export const AbilityLookup = (): React.JSX.Element => {
	const { setSnackbarOpen, setSnackbarMessage, setSnackbarColor } = useContext(SnackbarContext);

	const [abilityInput, setAbilityInput] = useState<string>('');
	const [isAbilityDialogOpen, setIsAbilityDialogOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);

	const { fetchAbilityRequest, ability, setAbility } = useFetchAbility();

	const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setAbilityInput(event.target.value);
	};

	const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();

		if (abilityInput.length < 1) {
			setSnackbarMessage('Error: Input value is empty.');
			setSnackbarColor('error');
			setSnackbarOpen(true);

			return;
		}

		setIsLoading(true);
		fetchAbilityRequest({ abilityName: formatNameForApi(abilityInput), setIsLoading, setIsError });
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

		setIsError(false);
		setAbilityInput('');
	}, [ability, isError, setSnackbarColor, setSnackbarMessage, setSnackbarOpen]);

	return (
		<>
			{!isLoading ? (
				<Paper elevation={3} sx={{ m: 5, backgroundColor: '#B8D8D8' }}>
					<Box component='form' onSubmit={onSubmit}>
						<TextField label='Search an ability' onChange={onChange} />
						<Button type='submit'>
							<Typography variant='body1'>
								Submit
							</Typography>
						</Button>
					</Box>
					<AbilityDialog ability={ability} setAbility={setAbility} isAbilityDialogOpen={isAbilityDialogOpen} setIsAbilityDialogOpen={setIsAbilityDialogOpen} />
				</Paper>
			) : (
				<PokeballLoader />
			)}
		</>
	);
};
