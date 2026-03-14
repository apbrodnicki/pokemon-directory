import GitHubIcon from '@mui/icons-material/GitHub';
import { Box, Link as MuiLink, Typography } from '@mui/material';
import pokeApiLogo from 'assets/pokeapi-logo.svg';
import React from 'react';
import { CustomTooltip } from './custom/CustomTooltip';

export const Footer = (): React.JSX.Element => {
	return (
		<Box id='footer'>
			<Box display='flex' alignItems='center' justifyContent='center'>
				<Typography variant='subtitle1' mx={1}>
					Created by Alex Brodnicki
				</Typography>
				<MuiLink href='https://github.com/apbrodnicki' target='_blank' mx={1}>
					<CustomTooltip title='My GitHub'>
						<GitHubIcon fontSize='large' />
					</CustomTooltip>
				</MuiLink>
			</Box>
			<Box display='flex' alignItems='center' justifyContent='center'>
				<Typography variant='subtitle1' mx={1}>
					Data provided by PokéApi
				</Typography>
				<MuiLink href='https://pokeapi.co/' target='_blank' underline='hover' color='black' mx={1}>
					<CustomTooltip title='PokéApi Website'>
						<Box
							component='img'
							src={pokeApiLogo}
							alt='PokéApi logo'
							width='62.5px'
							height='25px'
						/>
					</CustomTooltip>
				</MuiLink>
			</Box>
		</Box>
	);
};
