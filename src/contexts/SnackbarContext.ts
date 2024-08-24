import type React from 'react';
import { createContext } from 'react';

interface SnackContextProps {
	snackbarOpen: boolean,
	setSnackbarOpen: React.Dispatch<React.SetStateAction<boolean>>,
	snackbarMessage: string,
	setSnackbarMessage: React.Dispatch<React.SetStateAction<string>>,
	snackbarColor: 'success' | 'info' | 'warning' | 'error',
	setSnackbarColor: React.Dispatch<React.SetStateAction<'success' | 'info' | 'warning' | 'error'>>
}

export const SnackbarContext = createContext<SnackContextProps>({
	snackbarOpen: false,
	setSnackbarOpen: () => {},
	snackbarMessage: '',
	setSnackbarMessage: () => {},
	snackbarColor: 'info',
	setSnackbarColor: () => {}
});
