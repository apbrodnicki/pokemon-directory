import { Box, Grid, Paper, Typography } from '@mui/material';
import { runnerPokemon } from 'data';
import React from 'react';
import { isRouteErrorResponse, useRouteError } from 'react-router-dom';
import { Footer } from './Footer';
import { Header } from './Header';
import { Runner } from './Runner';

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
		<Box id="error-page">
			<Runner leftPokemon={runnerPokemon.topLeft} rightPokemon={runnerPokemon.topRight}>
				<Header />
			</Runner>
			<Box
				display='flex'
				flexDirection='column'
				justifyContent='center'
				flex={1}
			>
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
			</Box>
			<Runner leftPokemon={runnerPokemon.bottomLeft} rightPokemon={runnerPokemon.bottomRight}>
				<Footer />
			</Runner>
		</Box>
	);
};
