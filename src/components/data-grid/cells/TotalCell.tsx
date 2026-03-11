import { Box, Typography } from '@mui/material';
import { getProgressColor } from 'helper/helper';
import React from 'react';

interface TotalCellProps {
	totalValue: number
}

export const TotalCell = ({ totalValue }: TotalCellProps): React.JSX.Element => (
	<Box
		bgcolor={getProgressColor(totalValue / 780 * 100)}
		height='100%'
		width='100%'
		display='flex'
		justifyContent='center'
		alignItems='center'
	>
		<Typography my={1} textAlign='center'>{totalValue}</Typography>
	</Box>
);
