import { defaultAbility } from 'data';
import { getAbilityDescription } from 'helper/filterApiData';
import type { GenericAbility } from 'models/genericModels';
import type { Ability } from 'models/models';
import type React from 'react';
import { useState } from 'react';
import { fetchAbility } from './fetchAbility';

interface useFetchAbilityReturn {
	fetchAbilityRequest: (
		{ abilityName, setIsLoading, setIsError } : fetchAbilityRequestProps
	) => void,
	ability: Ability,
	setAbility: React.Dispatch<React.SetStateAction<Ability>>
}

interface fetchAbilityRequestProps {
	abilityName: string,
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
	setIsError: React.Dispatch<React.SetStateAction<boolean>>
}

export const useFetchAbility = (): useFetchAbilityReturn => {
	const [ability, setAbility] = useState<Ability>(defaultAbility);

	const fetchAbilityRequest = (
		{ abilityName, setIsLoading, setIsError } : fetchAbilityRequestProps
	): void => {
		void fetchAbility(abilityName)
			.then((response: GenericAbility) => response)
			.then((result: GenericAbility) => { setAbility(getAbilityDescription(result)); })
			.catch(() => { setIsError(true); })
			.finally(() => { setIsLoading(false); });
	};

	return { fetchAbilityRequest, ability, setAbility };
};
