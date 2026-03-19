import { Box, Tooltip, Typography, Zoom } from '@mui/material';
import React from 'react';

interface CustomTooltipProps {
	title: string;
	haveCursor?: boolean;
	onClick?: React.MouseEventHandler<HTMLDivElement>;
	children: React.PropsWithChildren<React.JSX.Element>;
}

export const CustomTooltip = ({ title, haveCursor, onClick, children }: CustomTooltipProps): React.JSX.Element => (
	<Tooltip
		title={
			<Box m={1}>
				<Typography variant='subtitle2'>{title}</Typography>
			</Box>
		}
		slots={{ transition: Zoom }}
		slotProps={{
			tooltip: {
				sx: {
					bgcolor: '#D4728A',
					color: 'black'
				}
			}
		}}
		placement='top'
		leaveDelay={100}
		arrow
		onClick={onClick}
		sx={{ ...(haveCursor === true && { cursor: 'pointer' }) }}
	>
		{children}
	</Tooltip>
);
