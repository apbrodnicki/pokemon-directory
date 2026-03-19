import { Box, LinearProgress, Typography } from '@mui/material';
import { statValues } from 'data';
import { getProgressColor } from 'helper/helper';
import React from 'react';

interface StatCellProps {
	statValue: number;
}

export const StatCell = (
	{ statValue }: StatCellProps
): React.JSX.Element => {
	const progressValue = statValue / statValues.maxIndividualStat * 100;

	return (
		<Box width='100%'>
			<Typography variant='subtitle2' mb={1} textAlign='center'>{statValue}</Typography>
			<LinearProgress
				variant='determinate'
				value={progressValue}
				sx={{
					height: 30,
					'& .MuiLinearProgress-bar1Determinate': {
						backgroundColor: getProgressColor(progressValue)
					}
				}}
			/>
		</Box>
	);
};
