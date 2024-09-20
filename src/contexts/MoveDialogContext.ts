import { defaultMove } from 'data';
import type { Move } from 'models/models';
import type React from 'react';
import { createContext } from 'react';

interface MoveDialogContextProps {
	move: Move,
	setMove: React.Dispatch<React.SetStateAction<Move>>,
	isMoveDialogOpen: boolean,
	setIsMoveDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const MoveDialogContext = createContext<MoveDialogContextProps>({
	move: defaultMove,
	setMove: () => {},
	isMoveDialogOpen: false,
	setIsMoveDialogOpen: () => {}
});
