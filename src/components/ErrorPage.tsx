import { Box, Grid, Paper, Typography } from '@mui/material';
import React from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';

export const ErrorPage = (): React.JSX.Element => {
	const error = useRouteError();
	let errorMessage: string;

	if (isRouteErrorResponse(error)) {
		errorMessage = error.statusText;
	} else if (error instanceof Error) {
		errorMessage = error.message;
	} else if (typeof error === 'string') {
		errorMessage = error;
	} else {
		console.error(error);
		errorMessage = 'An unknown error has occurred.';
	}

	return (
		<>
			<Header />
			<Grid container justifyContent='center'>
				<Grid item maxWidth='50%'>
					<Paper
						elevation={3}
						sx={{
							m: 5,
							backgroundColor: '#B8D8D8'
						}}>
						<Box p={5}>
							<Typography align='center'>
								{errorMessage}
							</Typography>
						</Box>
					</Paper>
				</Grid>
			</Grid>
			<Footer />
		</>
	);
};
