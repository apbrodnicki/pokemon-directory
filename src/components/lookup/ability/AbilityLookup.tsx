import { useFetchAbility } from 'api/abilities/useFetchAbility';
import { PokeballLoader } from 'components/loaders/PokeballLoader';
import { SnackbarContext } from 'contexts/SnackbarContext';
import { defaultAbility } from 'data';
import { formatNameForApi } from 'helper/helper';
import React, { useContext, useEffect, useState } from 'react';
import { LookupForm } from '../LookupForm';
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
				<>
					<LookupForm label='Search for an ability' onSubmit={onSubmit} onChange={onChange} />
					<AbilityDialog ability={ability} setAbility={setAbility} isAbilityDialogOpen={isAbilityDialogOpen} setIsAbilityDialogOpen={setIsAbilityDialogOpen} />
				</>
			) : (
				<PokeballLoader />
			)}
		</>
	);
};
