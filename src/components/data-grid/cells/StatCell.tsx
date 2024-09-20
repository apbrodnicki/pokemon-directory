import { Box, LinearProgress, Typography } from '@mui/material';
import { getProgressColor } from 'helper/helper';
import React from 'react';

interface StatCellProps {
	statValue: number
}

export const StatCell = (
	{ statValue }: StatCellProps
): React.JSX.Element => (
	<Box width='100%'>
		<Typography my={1} textAlign='center'>{statValue}</Typography>
		<LinearProgress
			variant='determinate'
			value={statValue / 255 * 100}
			sx={{
				height: 30,
				'& .MuiLinearProgress-bar1Determinate': {
					backgroundColor: getProgressColor(statValue / 255 * 100)
				}
			}}
		/>
	</Box>
);
