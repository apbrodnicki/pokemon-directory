import { Box, Typography } from '@mui/material';
import { CustomTooltip } from 'components/custom/CustomTooltip';
import { formatAbilityName } from 'helper/helper';
import type { Ability } from 'models/models';
import React from 'react';

interface AbilitiesCellProps {
	abilityStrings: string[],
	abilities: Ability[]
}

export const AbilitiesCell = ({ abilityStrings, abilities }: AbilitiesCellProps): React.JSX.Element => (
	<Box>
		{abilityStrings.map((ability: string, index: number) => {
			const title = abilities.find(currentAbility => Object.keys(currentAbility).includes(ability));

			return (
				<CustomTooltip
					title={(title !== undefined) ? title[ability] : ''}
					key={index}
				>
					<Typography my={1} align='center'>{formatAbilityName(ability)}</Typography>
				</CustomTooltip>
			);
		})}
	</Box>
);
