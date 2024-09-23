import { useFetchItem } from 'api/items/useFetchItem';
import { PokeballLoader } from 'components/loaders/PokeballLoader';
import { SnackbarContext } from 'contexts/SnackbarContext';
import { defaultItem } from 'data';
import { formatNameForApi } from 'helper/helper';
import React, { useContext, useEffect, useState } from 'react';
import { LookupForm } from '../LookupForm';
import { ItemDialog } from './ItemDialog';

export const ItemLookup = (): React.JSX.Element => {
	const { setSnackbarOpen, setSnackbarMessage, setSnackbarColor } = useContext(SnackbarContext);

	const [itemInput, setItemInput] = useState<string>('');
	const [isItemDialogOpen, setIsItemDialogOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);

	const { fetchItemRequest, item, setItem } = useFetchItem();

	const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setItemInput(event.target.value);
	};

	const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();

		if (itemInput.length < 1) {
			setSnackbarMessage('Error: Input value is empty.');
			setSnackbarColor('error');
			setSnackbarOpen(true);

			return;
		}

		setIsLoading(true);
		fetchItemRequest({ itemName: formatNameForApi(itemInput), setIsLoading, setIsError });
	};

	useEffect(() => {
		if (isError) {
			setSnackbarMessage('Error: Invalid input value.');
			setSnackbarColor('error');
			setSnackbarOpen(true);
		}

		if (item !== defaultItem) {
			setIsItemDialogOpen(true);
		}

		setIsError(false);
		setItemInput('');
	}, [isError, item, setSnackbarColor, setSnackbarMessage, setSnackbarOpen]);

	return (
		<>
			{!isLoading ? (
				<>
					<LookupForm label='Search for an item' onSubmit={onSubmit} onChange={onChange} />
					<ItemDialog item={item} setItem={setItem} isItemDialogOpen={isItemDialogOpen} setIsItemDialogOpen={setIsItemDialogOpen} />
				</>
			) : (
				<PokeballLoader />
			)}
		</>
	);
};
