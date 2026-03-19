import styled from '@emotion/styled';
import { Dialog, ListItem, Paper, Radio } from '@mui/material';

export const StyledOptionListItem = styled(ListItem)(() => ({
	backgroundColor: '#B8314F',
	'&.MuiAutocomplete-option.Mui-focused': {
		backgroundColor: '#D4728A'
	}, '&.MuiAutocomplete-option[aria-selected="true"]': {
		backgroundColor: '#7D0B2B'
	},	'&.MuiAutocomplete-option.Mui-focused[aria-selected="true"]': {
		backgroundColor: '#9E1438'
	}
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

export const StyledRadioButton = styled(Radio)(() => ({
	color: '#B8314F;',
	'&.Mui-checked': {
		color: '#B8314F;',
	}
}));
