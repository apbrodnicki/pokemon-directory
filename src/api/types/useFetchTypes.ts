import { filterTypeData } from 'helper/filterApiData';
import { type Type } from 'models/models';
import type React from 'react';
import { useEffect, useState } from 'react';
import { fetchType } from './fetchType';

interface useFetchTypesProps {
	typesList: string[],
	setIsLoadingTypes: React.Dispatch<React.SetStateAction<boolean>>
}

export const useFetchTypes = (
	{ typesList, setIsLoadingTypes }: useFetchTypesProps
): Type[] => {
	const [types, setTypes] = useState<Type[]>([]);

	useEffect(() => {
		const fetchData = async (): Promise<void> => {
			try {
				const promises = typesList.map(async (type: string) => await fetchType(type));
				const typesData = await Promise.all(promises);
				const filteredTypes = typesData.map(filterTypeData);
				setTypes(filteredTypes);
			} catch (error) {
				console.log('Error fetching types ->', error);
			} finally {
				setIsLoadingTypes(false);
			}
		};

		void fetchData();
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [typesList.join(','), setIsLoadingTypes]); // typesList needs to be converted to a primitive type to avoid infinite calls

	return types;
};
