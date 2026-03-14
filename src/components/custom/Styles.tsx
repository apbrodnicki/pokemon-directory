import styled from '@emotion/styled';
import { Dialog, ListItem, Paper } from '@mui/material';

export const StyledOptionListItem = styled(ListItem)(() => ({
	backgroundColor: '#B8D8D8',
	'&.MuiAutocomplete-option.Mui-focused': {
		backgroundColor: '#DDEDED'
	},
}));

export const StyledGroupListItem = styled(ListItem)(() => ({
	padding: 0,
	flexDirection: 'column' as const,
	alignItems: 'flex-start'
}));

export const StyledPaper = styled(Paper)(() => ({
	margin: '24px',
	backgroundColor: '#B8D8D8',
	width: '33%'
}));

export const StyledDialog = styled(Dialog)(() => ({
	padding: '24px'
}));
