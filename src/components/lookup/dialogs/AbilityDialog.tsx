import { DialogContent, DialogContentText, DialogTitle, Divider, Typography } from '@mui/material';
import { StyledDialog } from 'components/custom/Styles';
import { defaultAbility, typeColors } from 'data';
import { formatName } from 'helper/helper';
import type { Ability } from 'models/models';
import React from 'react';

interface AbilityDialogProps {
	ability: Ability;
	setAbility: React.Dispatch<React.SetStateAction<Ability>>;
	isAbilityDialogOpen: boolean;
}

export const AbilityDialog = (
	{ ability, setAbility, isAbilityDialogOpen }: AbilityDialogProps
): React.JSX.Element => {
	const onClose = (): void => {
		setAbility(defaultAbility);
	};

	return (
		<StyledDialog
			open={isAbilityDialogOpen}
			onClose={onClose}
			onTransitionExited={() => { setAbility(defaultAbility); }}
			sx={{
				'& .MuiDialog-paper': {
					width: '100%',
					backgroundColor: typeColors.fighting
				}
			}}
		>
			<DialogTitle textAlign='center'>
				{formatName(Object.keys(ability)[0])} (Ability)
			</DialogTitle>
			<Divider textAlign='left'>
				<Typography variant='body1'>Description</Typography>
			</Divider>
			<DialogContent>
				<DialogContentText>
					{Object.values(ability)}
				</DialogContentText>
			</DialogContent>
		</StyledDialog>
	);
};
