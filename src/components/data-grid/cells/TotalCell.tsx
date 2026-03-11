import { Box, Typography } from '@mui/material';
import { statValues } from 'data';
import { getProgressColor } from 'helper/helper';
import React from 'react';

interface TotalCellProps {
	totalValue: number
}

export const TotalCell = ({ totalValue }: TotalCellProps): React.JSX.Element => (
	<Box
		bgcolor={getProgressColor(totalValue / statValues.maxTotalStat * 100)}
		height='100%'
		width='100%'
		display='flex'
		justifyContent='center'
		alignItems='center'
	>
		<Typography my={1} textAlign='center'>{totalValue}</Typography>
	</Box>
);
