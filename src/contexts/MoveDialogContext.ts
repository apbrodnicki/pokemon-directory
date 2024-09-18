import { defaultMove } from 'data';
import type { Move } from 'models/models';
import type React from 'react';
import { createContext } from 'react';

interface MoveDialogContextProps {
	move: Move,
	isOpen: boolean,
	setIsOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const MoveDialogContext = createContext<MoveDialogContextProps>({
	move: defaultMove,
	isOpen: false,
	setIsOpen: () => {}
});
