import { SnackbarContext } from 'contexts/SnackbarContext';
import { defaultAbility } from 'data';
import { getAbilityDescription } from 'helper/filterApiData';
import type { GenericAbility } from 'models/genericModels';
import type { Ability } from 'models/models';
import type React from 'react';
import { useContext, useState } from 'react';
import { fetchAbility } from './fetchAbility';

interface useFetchAbilityReturn {
	fetchAbilityRequest: (
		{ abilityName, setIsLoading } : fetchAbilityRequestProps
	) => void;
	ability: Ability;
	setAbility: React.Dispatch<React.SetStateAction<Ability>>;
}

interface fetchAbilityRequestProps {
	abilityName: string;
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useFetchAbility = (): useFetchAbilityReturn => {
	const { setSnackbarOpen, setSnackbarMessage, setSnackbarColor } = useContext(SnackbarContext);

	const [ability, setAbility] = useState<Ability>(defaultAbility);

	const fetchAbilityRequest = (
		{ abilityName, setIsLoading } : fetchAbilityRequestProps
	): void => {
		void fetchAbility(abilityName)
			.then((response: GenericAbility) => response)
			.then((result: GenericAbility) => { setAbility(getAbilityDescription(result)); })
			.catch(() => {
				setSnackbarMessage('Error: Invalid input value.');
				setSnackbarColor('error');
				setSnackbarOpen(true);
			})
			.finally(() => { setIsLoading(false); });
	};

	return { fetchAbilityRequest, ability, setAbility };
};
