import { Button, Paper, TextField, Typography } from '@mui/material';
import { useFetchContactMovesHtml } from 'api/moves/useFetchContactMovesHtml';
import { useFetchMove } from 'api/moves/useFetchMove';
import { MoveDialogContext } from 'contexts/MoveDialogContext';
import { SnackbarContext } from 'contexts/SnackbarContext';
import { defaultMove } from 'data';
import { formatNameForApi } from 'helper/helper';
import React, { useContext, useEffect, useState } from 'react';
import { MoveDialog } from './MoveDialog';

export const MoveLookup = (): React.JSX.Element => {
	const { setSnackbarOpen, setSnackbarMessage, setSnackbarColor } = useContext(SnackbarContext);

	const [moveInput, setMoveInput] = useState<string>('');
	const [isMoveDialogOpen, setIsMoveDialogOpen] = useState<boolean>(false);
	const [isLoading, setIsLoading] = useState<boolean>(false);
	const [isError, setIsError] = useState<boolean>(false);

	const contactMoves = useFetchContactMovesHtml();
	const { fetchMoveRequest, move, setMove } = useFetchMove();

	const onChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
		setMoveInput(event.target.value);
	};

	const onSubmit = (): void => {
		if (moveInput.length < 1) {
			setSnackbarMessage('Error: Input value is empty.');
			setSnackbarColor('error');
			setSnackbarOpen(true);

			return;
		}

		setIsLoading(true);
		fetchMoveRequest({ moveName: formatNameForApi(moveInput), contactMoves, setIsLoading, setIsError });
	};

	useEffect(() => {
		if (isError) {
			setSnackbarMessage('Error: Invalid input value.');
			setSnackbarColor('error');
			setSnackbarOpen(true);
		}

		if (move !== defaultMove) {
			setIsMoveDialogOpen(true);
		}

		setIsError(false);
	}, [isError, move, setSnackbarColor, setSnackbarMessage, setSnackbarOpen]);

	return (
		<MoveDialogContext.Provider value={{ move, setMove, isMoveDialogOpen, setIsMoveDialogOpen }}>
			<Paper elevation={3} sx={{ m: 5, backgroundColor: '#B8D8D8' }}>
				{!isLoading ? (
					<>
						<TextField label='Search a move' onChange={onChange} />
						<Button onClick={onSubmit}>
							<Typography variant='body1'>
								Submit
							</Typography>
						</Button>
					</>
				) : (
					<Typography>
						loading
					</Typography>
				)}
				<MoveDialog />
			</Paper>
		</MoveDialogContext.Provider>
	);
};