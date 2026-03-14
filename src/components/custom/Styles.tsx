import styled from '@emotion/styled';
import { Dialog, ListItem, Paper } from '@mui/material';

export const StyledOptionListItem = styled(ListItem)(() => ({
	backgroundColor: '#B8314F',
	'&.MuiAutocomplete-option.Mui-focused': {
		backgroundColor: '#D4728A'
	},
}));

export const StyledGroupListItem = styled(ListItem)(() => ({
	padding: 0,
	flexDirection: 'column' as const,
	alignItems: 'flex-start'
}));

export const StyledPaper = styled(Paper)(() => ({
	margin: '24px',
	backgroundColor: '#B8314F',
	width: '33%'
}));

export const StyledDialog = styled(Dialog)(() => ({
	padding: '24px'
}));
