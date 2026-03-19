import { createTheme } from '@mui/material';
import PokemonFont from 'assets/font/PokemonGb-RAeo.ttf';

export const theme = createTheme({
	components: {
		MuiCssBaseline: {
			styleOverrides: `
				@font-face {
				font-family: 'PokemonFont';
					src: url('${PokemonFont}') format('truetype');
				}
			`
		}
	},
	typography: {
		fontFamily: 'PokemonFont',
		subtitle1: {
			fontSize: '.75rem',
			fontWeight: 700,
			color: 'black'
		},
		subtitle2: {
			fontSize: '.67rem',
			color: 'black'
		}
	}
});
