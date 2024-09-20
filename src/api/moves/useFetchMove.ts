import { defaultMove } from 'data';
import { filterMoveData } from 'helper/filterApiData';
import { type GenericMove } from 'models/genericModels';
import type { Move } from 'models/models';
import type React from 'react';
import { useState } from 'react';
import { fetchMove } from './fetchMove';

interface useFetchMoveReturn {
	fetchMoveRequest: (
		{ moveName, contactMoves, setIsLoading, setIsError } : fetchMoveRequestProps
	) => void,
	move: Move,
	setMove: React.Dispatch<React.SetStateAction<Move>>
}

interface fetchMoveRequestProps {
	moveName: string,
	contactMoves: string[],
	setIsLoading: React.Dispatch<React.SetStateAction<boolean>>,
	setIsError: React.Dispatch<React.SetStateAction<boolean>>
}

export const useFetchMove = (): useFetchMoveReturn => {
	const [move, setMove] = useState<Move>(defaultMove);

	const fetchMoveRequest = (
		{ moveName, contactMoves, setIsLoading, setIsError } : fetchMoveRequestProps
	): void => {
		void fetchMove(moveName)
			.then((response: GenericMove) => response)
			.then((result: GenericMove) => { setMove(filterMoveData(result, contactMoves)); })
			.catch(() => { setIsError(true); })
			.finally(() => { setIsLoading(false); });
	};

	return { fetchMoveRequest, move, setMove };
};
