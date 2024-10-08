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
		setIsItemDialogOpen(false);
	};

	return (
		<Dialog
			open={isItemDialogOpen}
			onClose={onClose}
			onTransitionExited={() => { setItem(defaultItem); }}
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
					alt='sprite'
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
