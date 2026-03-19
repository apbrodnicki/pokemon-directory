import { Box, Typography } from '@mui/material';
import React from 'react';

export const Header = (): React.JSX.Element => {
	return (
		<Box id='header' mx={1}>
			<Typography
				color='black'
				align='center'
				sx={{
					typography: {
						md: 'h4',
						xs: 'h6'
					}
				}}
			>
				Pokémon Directory
			</Typography>
		</Box>
	);
};
