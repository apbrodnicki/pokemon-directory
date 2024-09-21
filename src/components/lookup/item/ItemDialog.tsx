import { Box, Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { defaultItem } from 'data';
import { formatName } from 'helper/helper';
import type { Item } from 'models/models';
import React from 'react';

interface ItemDialogProps {
	item: Item,
	setItem: React.Dispatch<React.SetStateAction<Item>>,
	isItemDialogOpen: boolean,
	setIsItemDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const ItemDialog = (
	{ item, setItem, isItemDialogOpen, setIsItemDialogOpen }: ItemDialogProps
): React.JSX.Element => {
	const onClose = (): void => {
		// TODO: fix flashing default item dialog on close
		setIsItemDialogOpen(false);
		setItem(defaultItem);
	};

	return (
		<Dialog
			open={isItemDialogOpen}
			onClose={onClose}
			sx={{
				p: 3,
				'& .MuiDialog-paper': {
					backgroundColor: '#B8D8D8'
				}
			}}
		>
			<DialogTitle>
				{formatName(item.name)}
				<Box
					component='img'
					src={item.sprite}
					alt='type'
				/>
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					{item.description}
				</DialogContentText>
			</DialogContent>
			<DialogContent>
				<DialogContentText>
					Fling Power: {item.flingPower}
				</DialogContentText>
				<DialogContentText>
					Fling Effect: {item.flingEffect ?? 'None'}
				</DialogContentText>
			</DialogContent>
		</Dialog>
	);
};
