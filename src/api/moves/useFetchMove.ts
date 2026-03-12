import { SnackbarContext } from 'contexts/SnackbarContext';
import { defaultMove } from 'data';
import { filterMoveData } from 'helper/filterApiData';
import { type GenericMove } from 'models/genericModels';
import type { Move } from 'models/models';
import type React from 'react';
import { useContext, useState } from 'react';
import { fetchMove } from './fetchMove';

interface useFetchMoveReturn {
	fetchMoveRequest: (
		{ moveName, contactMoves, setIsLoading } : fetchMoveRequestProps
	) => void;
	move: Move;
	setMove: React.Dispatch<React.SetStateAction<Move>>;
}

interface fetchMoveRequestProps {
	moveName: string;
	contactMoves: string[];
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const useFetchMove = (): useFetchMoveReturn => {
	const { setSnackbarOpen, setSnackbarMessage, setSnackbarColor } = useContext(SnackbarContext);

	const [move, setMove] = useState<Move>(defaultMove);

	const fetchMoveRequest = (
		{ moveName, contactMoves, setIsLoading } : fetchMoveRequestProps
	): void => {
		void fetchMove(moveName)
			.then((response: GenericMove) => response)
			.then((result: GenericMove) => { setMove(filterMoveData(result, contactMoves)); })
			.catch(() => {
				setSnackbarMessage('Error: Invalid input value.');
				setSnackbarColor('error');
				setSnackbarOpen(true);
			})
			.finally(() => { setIsLoading(false); });
	};

	return { fetchMoveRequest, move, setMove };
};
