import { Box, Typography } from '@mui/material';
import React from 'react';

export const Header = (): React.JSX.Element => {
	return (
		<Box id='header'>
			<Typography
				color='black'
				align='center'
				sx={{
					typography: {
						sm: 'h3',
						xs: 'h6'
					}
				}}
			>
				Pokémon Directory
			</Typography>
		</Box>
	);
};
