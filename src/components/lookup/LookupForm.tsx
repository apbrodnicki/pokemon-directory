import { Box, Button, Chip, FormControl, InputLabel, MenuItem, Paper, Select, TextField, Typography, type SelectChangeEvent } from '@mui/material';
import { types } from 'data';
import { capitalizeFirstLetter } from 'helper/helper';
import type { LookupType, Types } from 'models/models';
import React from 'react';

interface LookupFormProps {
	lookupType: LookupType['lookupType'];
	typesInput: (keyof Types)[];
	onSubmit: (event: React.SubmitEvent) => void;
	onLookupInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
	onTypesInputChange: (event: SelectChangeEvent<(keyof Types)[]>) => void;
}

export const LookupForm = (
	{ lookupType, typesInput, onSubmit, onLookupInputChange, onTypesInputChange }: LookupFormProps
): React.JSX.Element => (
	<Paper elevation={3} sx={{ width: { xs: '67%', md: '33%' }, backgroundColor: '#B8314F' }}>
		<Box component='form' onSubmit={onSubmit} display='flex' flexDirection='column'>
			{lookupType !== 'types' ? (
				<TextField
					label={<Typography variant='subtitle1'>Lookup</Typography>}
					onChange={onLookupInputChange}
					variant='filled'
					color='warning'
				/>
			) : (
				<FormControl fullWidth variant='filled' color='warning'>
					<InputLabel id='types-lookup'>
						<Typography variant='subtitle1'>Lookup</Typography>
					</InputLabel>
					<Select
						labelId='types-lookup'
						label='Lookup'
						multiple
						value={typesInput}
						onChange={onTypesInputChange}
						MenuProps={{
							slotProps: {
								paper: {
									style: {
										maxHeight: 333,
										backgroundColor: '#B8314F'
									}
								}
							}
						}}
						renderValue={(selected) => (
							<Box display='flex' flexWrap='wrap' gap={.5}>
								{selected.map((value) => (
									<Chip key={value} label={capitalizeFirstLetter(value)} />
								))}
							</Box>
						)}
					>
						{types.map((type, index) => (
							<MenuItem
								key={index}
								value={type}
								disabled={typesInput.length > 1 && !typesInput.includes(type)}
								sx={{
									'&:hover': {
										backgroundColor: '#D4728A'
									}, '&.Mui-selected': {
										backgroundColor: '#7D0B2B'
									}, '&.Mui-selected:hover': {
										backgroundColor: '#9E1438'
									}
								}}
							>
								{capitalizeFirstLetter(type)}
							</MenuItem>
						))}
					</Select>
				</FormControl>
			)}
			<Button type='submit'>
				<Typography variant='body1' color='black'>
					Submit
				</Typography>
			</Button>
		</Box>
	</Paper>
);
