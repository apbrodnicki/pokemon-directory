import { Box, DialogContent, DialogContentText, DialogTitle, Divider, Typography } from '@mui/material';
import { useFetchTypes } from 'api/types/useFetchTypes';
import { StyledDialog } from 'components/custom/Styles';
import { capitalizeFirstLetter } from 'helper/helper';
import type { Types } from 'models/models';
import React from 'react';

interface TypesDialogProps {
	typesInput: (keyof Types)[];
	setTypesInput: React.Dispatch<React.SetStateAction<(keyof Types)[]>>;
	isTypesDialogOpen: boolean;
	setIsTypesDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setIsTypesLookupLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TypesDialog = (
	{ typesInput, setTypesInput, isTypesDialogOpen, setIsTypesDialogOpen, setIsTypesLookupLoading }: TypesDialogProps
): React.JSX.Element => {
	const types = useFetchTypes({ typesList: typesInput, setIsLoadingTypes: setIsTypesLookupLoading });

	const onClose = (): void => {
		setIsTypesDialogOpen(false);
		setTypesInput([]);
	};

	return (
		<StyledDialog
			open={isTypesDialogOpen}
			onClose={onClose}
			onTransitionExited={() => { setIsTypesDialogOpen(false); setTypesInput([]); }}
			sx={{
				'& .MuiDialog-paper': {
					width: '100%',
					backgroundColor: '#D4728A'
				}
			}}
		>
			<DialogTitle textAlign='center'>
				<Box display='flex' justifyContent='center'>
					{types.map((type, index) => (
						<Box key={index} pr={1}>
							{capitalizeFirstLetter(type.name)}
						</Box>
					))}
					{types.length > 1 ? ('(Types)') : ('(Type)')}
				</Box>
			</DialogTitle>
			<Divider textAlign='left'>
				<Typography variant='body1'>Description</Typography>
			</Divider>
			<DialogContent>
				<DialogContentText>
				</DialogContentText>
			</DialogContent>
		</StyledDialog>
	);
};
