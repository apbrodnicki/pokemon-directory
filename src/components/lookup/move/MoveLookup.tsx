import { useFetchContactMovesHtml } from 'api/moves/useFetchContactMovesHtml';
import { useFetchMove } from 'api/moves/useFetchMove';
import { PokeballLoader } from 'components/loaders/PokeballLoader';
import { SnackbarContext } from 'contexts/SnackbarContext';
import { defaultMove } from 'data';
import { formatNameForApi } from 'helper/helper';
import React, { useContext, useEffect, useState } from 'react';
import { LookupForm } from '../LookupForm';
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

	const onSubmit = (event: React.FormEvent<HTMLFormElement>): void => {
		event.preventDefault();

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
		setMoveInput('');
	}, [isError, move, setSnackbarColor, setSnackbarMessage, setSnackbarOpen]);

	return (
		<>
			{!isLoading ? (
				<>
					<LookupForm label='Search for a move' onSubmit={onSubmit} onChange={onChange} />
					<MoveDialog move={move} setMove={setMove} isMoveDialogOpen={isMoveDialogOpen} setIsMoveDialogOpen={setIsMoveDialogOpen} />
				</>
			) : (
				<PokeballLoader />
			)}
		</>
	);
};
