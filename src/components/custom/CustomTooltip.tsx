import { Tooltip, Zoom } from '@mui/material';
import React from 'react';

interface CustomTooltipProps {
	title: string,
	haveCursor?: boolean,
	onClick?: React.MouseEventHandler<HTMLDivElement>
	children: React.PropsWithChildren<React.JSX.Element>
}

export const CustomTooltip = ({ title, haveCursor, onClick, children }: CustomTooltipProps): React.JSX.Element => (
	<Tooltip
		title={title}
		TransitionComponent={Zoom}
		placement='top'
		leaveDelay={100}
		arrow
		onClick={onClick}
		sx={(haveCursor === true) ? { cursor: 'pointer' } : {}}
	>
		{children}
	</Tooltip>
);
