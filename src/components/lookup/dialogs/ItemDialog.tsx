import { Box, DialogContent, DialogContentText, DialogTitle, Divider, Typography } from '@mui/material';
import pokeballIcon from 'assets/pokeball-icon.svg';
import { StyledDialog } from 'components/custom/Styles';
import { defaultItem } from 'data';
import type { Item } from 'models/models';
import React from 'react';

interface ItemDialogProps {
	item: Item;
	setItem: React.Dispatch<React.SetStateAction<Item>>;
	isItemDialogOpen: boolean;
}

export const ItemDialog = (
	{ item, setItem, isItemDialogOpen }: ItemDialogProps
): React.JSX.Element => {
	const onClose = (): void => {
		setItem(defaultItem);
	};

	return (
		<StyledDialog
			open={isItemDialogOpen}
			onClose={onClose}
			onTransitionExited={() => { setItem(defaultItem); }}
			sx={{
				'& .MuiDialog-paper': {
					width: '100%',
					backgroundColor: '#D4728A'
				}
			}}
		>
			<Box display='flex' justifyContent='center' alignItems='center'>
				<DialogTitle textAlign='center'>
					{item.name}
				</DialogTitle>
				<Box
					component='img'
					src={item.sprite ?? pokeballIcon}
					alt='sprite'
					height={75}
					width={75}
				/>
			</Box>
			<Divider textAlign='left'>
				<Typography variant='subtitle1'>Description</Typography>
			</Divider>
			<DialogContent>
				<DialogContentText variant='subtitle2'>
					{item.description}
				</DialogContentText>
			</DialogContent>
			<Divider textAlign='left'>
				<Typography variant='subtitle1'>Fling</Typography>
			</Divider>
			<DialogContent>
				<DialogContentText variant='subtitle2'>
					Power: {item.flingPower}
				</DialogContentText>
				<DialogContentText variant='subtitle2'>
					Effect: {item.flingEffect ?? 'None'}
				</DialogContentText>
			</DialogContent>
		</StyledDialog>
	);
};
