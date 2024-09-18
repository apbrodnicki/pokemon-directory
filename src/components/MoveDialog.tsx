import { Box, Dialog, DialogTitle, Typography } from '@mui/material';
import { MoveDialogContext } from 'contexts/MoveDialogContext';
import React, { useContext } from 'react';

export const MoveDialog = (): React.JSX.Element => {
	const { move, isOpen, setIsOpen } = useContext(MoveDialogContext);

	const onClose = (): void => {
		setIsOpen(false);
	};

	return (
		<Dialog open={isOpen} onClose={onClose}>
			<DialogTitle>
				{move.name}
			</DialogTitle>
			<Box>
				accuracy: {move.accuracy}
				<Typography>
					isContact: {move.isContact ? 'true' : 'false'}
				</Typography>
			</Box>
		</Dialog>
	);
};
