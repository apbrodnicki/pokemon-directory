import { Box } from '@mui/material';
import { LookupDialogContext } from 'contexts/LookupDialogContext';
import React, { useState } from 'react';
import { MoveLookup } from './move/MoveLookup';

export const Lookup = (): React.JSX.Element => {
	const [isLookupDialogOpen, setIsLookupDialogOpen] = useState<boolean>(false);

	return (
		<LookupDialogContext.Provider value={{ isLookupDialogOpen, setIsLookupDialogOpen }}>
			<Box
				display='flex'
				flexDirection='column'
				justifyContent='center'
				flex={1}
			>
				<MoveLookup />
			</Box>
		</LookupDialogContext.Provider>
	);
};
