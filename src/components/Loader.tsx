import { Box, CardMedia } from '@mui/material';
import loader from 'assets/loader.webm';
import React from 'react';

export const Loader = (): React.JSX.Element => (
	<Box display='flex' justifyContent='center' m={3}>
		<CardMedia
			component='video'
			src={loader}
			autoPlay
			loop
			muted
			width='800px'
			height='600px'
		/>
	</Box>
);
