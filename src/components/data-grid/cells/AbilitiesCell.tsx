import { Box, Chip, Typography } from '@mui/material';
import { CustomTooltip } from 'components/custom/CustomTooltip';
import { formatName } from 'helper/helper';
import type { Ability } from 'models/models';
import React from 'react';

interface AbilitiesCellProps {
	abilityStrings: string[];
	abilities: Ability[];
}

export const AbilitiesCell = ({ abilityStrings, abilities }: AbilitiesCellProps): React.JSX.Element => (
	<Box display='flex' flexDirection='column'>
		{abilityStrings.map((ability: string, index: number) => {
			const title = abilities.find(currentAbility => Object.keys(currentAbility).includes(ability));

			return (
				<CustomTooltip
					title={(title !== undefined) ? title[ability] : ''}
					key={index}
				>
					<Chip
						label={
							<Typography variant='subtitle2' whiteSpace='normal' my={1} align='center'>{formatName(ability)}</Typography>
						}
						sx={{
							my: .5
						}}
					/>
				</CustomTooltip>
			);
		})}
	</Box>
);
