import { Dialog, DialogTitle, Typography } from '@mui/material';
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
		<Dialog open={isItemDialogOpen} onClose={onClose} sx={{ p: 3 }}>
			<DialogTitle>
				<Typography>
					{formatName(item.name)}: {item.description}
				</Typography>
			</DialogTitle>
		</Dialog>
	);
};
