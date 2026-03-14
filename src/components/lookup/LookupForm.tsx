import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import React from 'react';

interface LookupFormProps {
	label: string;
	onSubmit: (event: React.SubmitEvent) => void;
	onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const LookupForm = (
	{ label, onSubmit, onChange }: LookupFormProps
): React.JSX.Element => (
	<Paper elevation={3} sx={{ width: { xs: '67%', md: '33%' }, backgroundColor: '#B8314F' }}>
		<Box component='form' onSubmit={onSubmit} display='flex' flexDirection='column'>
			<TextField label={label} onChange={onChange} variant='filled' color='warning' />
			<Button type='submit'>
				<Typography variant='body1' color='black'>
					Submit
				</Typography>
			</Button>
		</Box>
	</Paper>
);
