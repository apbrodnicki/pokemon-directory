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
			fontSize: '.67rem'
		}
	}
});
