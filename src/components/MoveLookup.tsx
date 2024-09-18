import { Button, Paper, TextField, Typography } from '@mui/material';
import { useFetchContactMovesHtml } from 'api/useFetchContactMovesHtml';
import { useFetchMove } from 'api/useFetchMove';
import { MoveDialogContext } from 'contexts/MoveDialogContext';
import React, { useState } from 'react';
import { MoveDialog } from './MoveDialog';

export const MoveLookup = (): React.JSX.Element => {
	const [moveInput, setMoveInput] = useState<string>('');
	const [isMoveDialogOpen, setIsMoveDialogOpen] = useState<boolean>(false);

	const contactMoves = useFetchContactMovesHtml();
	const { fetchMoveRequest, move } = useFetchMove();

	const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setMoveInput(event.target.value);
	};

	const onSubmit = (): void => {
		if (moveInput.length > 0) {
			fetchMoveRequest(moveInput, contactMoves);
			setIsMoveDialogOpen(true);
		}
	};

	return (
		<MoveDialogContext.Provider value={{ move, isOpen: isMoveDialogOpen, setIsOpen: setIsMoveDialogOpen }}>
			<Paper elevation={3} sx={{ m: 5, backgroundColor: '#B8D8D8' }}>
				<TextField label='Search a move' onChange={onChange} />
				<Button onClick={onSubmit}>
					<Typography variant='body1'>
					Submit
					</Typography>
				</Button>
				<MoveDialog />
			</Paper>
		</MoveDialogContext.Provider>
	);
};
