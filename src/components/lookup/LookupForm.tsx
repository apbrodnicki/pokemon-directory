import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import React from 'react';

interface LookupFormProps {
	label: string;
	onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LookupForm = (
	{ label, onSubmit, onChange }: LookupFormProps
): React.JSX.Element => (
	<Paper elevation={3} sx={{ m: 5, backgroundColor: '#B8D8D8' }}>
		<Box component='form' onSubmit={onSubmit} display='flex'>
			<TextField label={label} onChange={onChange} />
			<Button type='submit'>
				<Typography variant='body1'>
					Submit
				</Typography>
			</Button>
		</Box>
	</Paper>
);
