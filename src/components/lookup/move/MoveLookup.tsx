import { Button, Paper, TextField, Typography } from '@mui/material';
import { useFetchContactMovesHtml } from 'api/moves/useFetchContactMovesHtml';
import { useFetchMove } from 'api/moves/useFetchMove';
import { LookupDialogContext } from 'contexts/LookupDialogContext';
import { MoveDialogContext } from 'contexts/MoveDialogContext';
import { SnackbarContext } from 'contexts/SnackbarContext';
import { defaultMove } from 'data';
import { formatNameForApi } from 'helper/helper';
import React, { useContext, useEffect, useState } from 'react';
import { MoveDialog } from './MoveDialog';

export const MoveLookup = (): React.JSX.Element => {
	const { setSnackbarOpen, setSnackbarMessage, setSnackbarColor } = useContext(SnackbarContext);
	const { setIsLookupDialogOpen } = useContext(LookupDialogContext);

	const [moveInput, setMoveInput] = useState<string>('');
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
			setIsLookupDialogOpen(true);
		}

		setIsError(false);
	}, [isError, move, setIsLookupDialogOpen, setSnackbarColor, setSnackbarMessage, setSnackbarOpen]);

	return (
		<MoveDialogContext.Provider value={{ move, setMove }}>
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
			</Paper>
			<MoveDialog />
		</MoveDialogContext.Provider>
	);
};
