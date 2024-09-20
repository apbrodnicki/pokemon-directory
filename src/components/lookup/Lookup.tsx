import { Box } from '@mui/material';
import React from 'react';
import { AbilityLookup } from './ability/AbilityLookup';
import { MoveLookup } from './move/MoveLookup';

export const Lookup = (): React.JSX.Element => {
	return (
		<Box
			display='flex'
			flexDirection='column'
			justifyContent='center'
			flex={1}
		>
			<AbilityLookup />
			<MoveLookup />
		</Box>
	);
};
