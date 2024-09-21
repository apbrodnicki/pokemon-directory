import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useFetchItem } from 'api/items/useFetchItem';
import { SnackbarContext } from 'contexts/SnackbarContext';
import { defaultItem } from 'data';
import { formatNameForApi } from 'helper/helper';
import React, { useContext, useEffect, useState } from 'react';
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

	const onSubmit = (): void => {
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
	}, [isError, item, setSnackbarColor, setSnackbarMessage, setSnackbarOpen]);

	return (
		<Paper elevation={3} sx={{ m: 5, backgroundColor: '#B8D8D8' }}>
			{!isLoading ? (
				<Box component='form' onSubmit={onSubmit}>
					<TextField label='Search an item' onChange={onChange} />
					<Button type='submit'>
						<Typography variant='body1'>
							Submit
						</Typography>
					</Button>
				</Box>
			) : (
				<Typography>
					loading
				</Typography>
			)}
			<ItemDialog item={item} setItem={setItem} isItemDialogOpen={isItemDialogOpen} setIsItemDialogOpen={setIsItemDialogOpen} />
		</Paper>
	);
};
