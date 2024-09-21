import { Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
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
		<Dialog
			open={isAbilityDialogOpen}
			onClose={onClose}
			sx={{
				p: 3,
				'& .MuiDialog-paper': {
					backgroundColor: '#B8D8D8'
				}
			}}
		>
			<DialogTitle>
				{formatName(Object.keys(ability)[0])}
			</DialogTitle>
			<DialogContent>
				<DialogContentText>
					{Object.values(ability)}
				</DialogContentText>
			</DialogContent>
		</Dialog>
	);
};
