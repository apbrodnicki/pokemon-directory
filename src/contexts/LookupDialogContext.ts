import type React from 'react';
import { createContext } from 'react';

interface LookupDialogContextProps {
	isLookupDialogOpen: boolean,
	setIsLookupDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const LookupDialogContext = createContext<LookupDialogContextProps>({
	isLookupDialogOpen: false,
	setIsLookupDialogOpen: () => {}
});
