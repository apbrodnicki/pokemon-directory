import { Box, DialogContent, DialogTitle, Divider, Typography } from '@mui/material';
import { useFetchTypes } from 'api/types/useFetchTypes';
import { ImagesTypes } from 'assets';
import { StyledDialog } from 'components/custom/Styles';
import { DamageRelationFromContent, DamageRelationToContent } from 'components/DamageRelationChart';
import { getDoubleTypeDamageRelationFrom } from 'helper/getDoubleTypeDamageRelationFrom';
import type { DamageRelationFrom, DamageRelationTo, Types } from 'models/models';
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

	let damageRelationFrom: DamageRelationFrom = {
		noDamageFrom: [],
		quarterDamageFrom: [],
		halfDamageFrom: [],
		doubleDamageFrom: [],
		quadrupleDamageFrom: []
	};
	let damageRelationTo: DamageRelationTo = {
		noDamageTo: [],
		halfDamageTo: [],
		doubleDamageTo: []
	};

	if (types.length === 2) {
		damageRelationFrom = getDoubleTypeDamageRelationFrom(types);
	} else {
		const {
			noDamageFrom,
			noDamageTo,
			halfDamageFrom,
			halfDamageTo,
			doubleDamageFrom,
			doubleDamageTo
		} = types[0];

		damageRelationFrom = { noDamageFrom, halfDamageFrom, doubleDamageFrom };
		damageRelationTo = { noDamageTo, halfDamageTo, doubleDamageTo };
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
				<Typography variant='subtitle1'>Defensive Type Chart</Typography>
			</Divider>
			<DialogContent>
				{DamageRelationFromContent(damageRelationFrom)}
			</DialogContent>
			{types.length === 1 && (
				<>
					<Divider textAlign='left'>
						<Typography variant='subtitle1'>Offensive Type Chart</Typography>
					</Divider>
					<DialogContent>
						{DamageRelationToContent(damageRelationTo)}
					</DialogContent>
				</>
			)}
		</StyledDialog>
	);
};
