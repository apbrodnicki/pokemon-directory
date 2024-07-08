import { getAbilityDescription } from 'helper/filterApiData';
import { type Ability } from 'models/models';
import type React from 'react';
import { useEffect, useState } from 'react';
import { fetchAbility } from './fetchAbility';

interface useFetchAbilityDescriptionsProps {
	abilities: string[],
	setIsLoadingAbilityDescriptions: React.Dispatch<React.SetStateAction<boolean>>
}

export const useFetchAbilityDescriptions = (
	{ abilities, setIsLoadingAbilityDescriptions }: useFetchAbilityDescriptionsProps
): Ability[] => {
	const [descriptions, setDescriptions] = useState<Ability[]>([]);

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			try {
				const promises = abilities.map(async (ability: string) => await fetchAbility(ability));
				const abilityData = await Promise.all(promises);
				const abilityDescriptions = abilityData.map(getAbilityDescription);
				setDescriptions(abilityDescriptions);
			} catch (error) {
				console.log('Error fetching ability descriptions ->', error);
			} finally {
				setIsLoadingAbilityDescriptions(false);
			}
		};

		void fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [abilities.join(','), setIsLoadingAbilityDescriptions]); // abilities needs to be converted to a primitive type to avoid infinite calls

	return descriptions;
};
