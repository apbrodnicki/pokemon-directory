import { Box, DialogContent, DialogTitle, Divider, Typography } from '@mui/material';
import { useFetchTypes } from 'api/types/useFetchTypes';
import { ImagesTypes } from 'assets';
import { StyledDialog } from 'components/custom/Styles';
import { DamageRelationContent } from 'components/DamageRelationChart';
import { getTypesDamageRelation } from 'helper/getTypesDamageRelation';
import type { DamageRelation, Types } from 'models/models';
import React from 'react';

interface TypesDialogProps {
	typesInput: (keyof Types)[];
	setTypesInput: React.Dispatch<React.SetStateAction<(keyof Types)[]>>;
	isTypesDialogOpen: boolean;
	setIsTypesDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
	setIsTypesLookupLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

export const TypesDialog = (
	{ typesInput, setTypesInput, isTypesDialogOpen, setIsTypesDialogOpen, setIsTypesLookupLoading }: TypesDialogProps
): React.JSX.Element => {
	const types = useFetchTypes({ typesList: typesInput, setIsLoadingTypes: setIsTypesLookupLoading });

	if (types.length === 0) {
		return <></>;
	}

	let damageRelation: DamageRelation = {
		noDamageFrom: types[0].noDamageFrom,
		halfDamageFrom: types[0].halfDamageFrom,
		doubleDamageFrom: types[0].doubleDamageFrom
	};

	if (types.length === 2) {
		damageRelation = getTypesDamageRelation(types);
	}

	const onClose = (): void => {
		setIsTypesDialogOpen(false);
		setTypesInput([]);
	};

	return (
		<StyledDialog
			open={isTypesDialogOpen}
			onClose={onClose}
			onTransitionExited={onClose}
			sx={{
				'& .MuiDialog-paper': {
					width: '100%',
					backgroundColor: '#D4728A'
				}
			}}
		>
			<DialogTitle textAlign='center'>
				<Box display='flex' justifyContent='center' alignItems='center' sx={{ flexDirection: { xs: 'column', sm: 'row' } }}>
					{types.map((type, index) => (
						<Box
							key={index}
							component='img'
							src={ImagesTypes[type.name as keyof Types]}
							alt={type.name}
							p={1}
						/>
					))}
				</Box>
			</DialogTitle>
			<Divider textAlign='left'>
				<Typography variant='subtitle1'>Type Chart</Typography>
			</Divider>
			<DialogContent>
				{DamageRelationContent(damageRelation)}
			</DialogContent>
		</StyledDialog>
	);
};
