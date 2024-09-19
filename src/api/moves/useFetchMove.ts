import { defaultMove } from 'data';
import { filterMoveData } from 'helper/filterApiData';
import { type GenericMove } from 'models/genericModels';
import type { Move } from 'models/models';
import { useState } from 'react';
import { fetchMove } from './fetchMove';

interface useFetchMoveReturn {
	fetchMoveRequest: (moveName: string, contactMoves: string[]) => void,
	move: Move
}

export const useFetchMove = (): useFetchMoveReturn => {
	const [move, setMove] = useState<Move>(defaultMove);

	const fetchMoveRequest = (moveName: string, contactMoves: string[]): void => {
		void fetchMove(moveName)
			.then((response: GenericMove) => response)
			.then((result: GenericMove) => { setMove(filterMoveData(result, contactMoves)); });
	};

	return { fetchMoveRequest, move };
};
