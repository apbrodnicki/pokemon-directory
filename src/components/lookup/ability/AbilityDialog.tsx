import { Dialog, DialogTitle, Typography } from '@mui/material';
import { defaultAbility } from 'data';
import { formatName } from 'helper/helper';
import type { Ability } from 'models/models';
import React from 'react';

interface AbilityDialogProps {
	ability: Ability,
	setAbility: React.Dispatch<React.SetStateAction<Ability>>,
	isAbilityDialogOpen: boolean,
	setIsAbilityDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const AbilityDialog = (
	{ ability, setAbility, isAbilityDialogOpen, setIsAbilityDialogOpen }: AbilityDialogProps
): React.JSX.Element => {
	const onClose = (): void => {
		// TODO: fix flashing default ability dialog on close
		setIsAbilityDialogOpen(false);
		setAbility(defaultAbility);
	};

	return (
		<Dialog open={isAbilityDialogOpen} onClose={onClose} sx={{ p: 3 }}>
			<DialogTitle>
				<Typography>
					{formatName(Object.keys(ability)[0])}: {Object.values(ability)}
				</Typography>
			</DialogTitle>
		</Dialog>
	);
};
