import { Box, Paper, Typography } from '@mui/material';
import { DamageRelationContent } from 'components/DamageRelationChart';
import { typeColors } from 'data';
import { getTypesDamageRelation } from 'helper/getTypesDamageRelation';
import { capitalizeFirstLetter } from 'helper/helper';
import PopupState, { bindHover, bindPopover } from 'material-ui-popup-state';
import HoverPopover from 'material-ui-popup-state/HoverPopover';
import type { DamageRelation, Type, Types } from 'models/models';
import React from 'react';

interface TypesCellProps {
	typeNames: Array<keyof Types>;
	types: Type[];
}

export const TypesCell = ({ typeNames, types }: TypesCellProps): React.JSX.Element => {
	if (typeNames.length > 1) {
		let damageRelation: DamageRelation = {
			noDamageFrom: [],
			quarterDamageFrom: [],
			halfDamageFrom: [],
			doubleDamageFrom: [],
			quadrupleDamageFrom: [],
		};

		const typesToGetDamageRelation = [];
		for (const currentTypeName of typeNames) {
			for (const currentType of types) {
				if (currentTypeName === currentType.name) {
					typesToGetDamageRelation.push(currentType);
				}
			}
		}

		if (typesToGetDamageRelation.length > 1) {
			damageRelation = getTypesDamageRelation(typesToGetDamageRelation);
		}

		const TypeBoxes = typeNames.map((typeName: keyof Types, index: number) => (
			<Box
				sx={{
					width: '40%',
					backgroundColor: typeColors[typeName],
				}}
				key={index}
			>
				<Typography variant='subtitle2' my={1} align='center'>{capitalizeFirstLetter(typeName)}</Typography>
			</Box>
		));

		return (
			<PopupState variant='popover' popupId='doubleTypesPopup'>
				{(popupState) => (
					<>
						<HoverPopover
							{...bindPopover(popupState)}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'center',
							}}
							transformOrigin={{
								vertical: 'bottom',
								horizontal: 'center',
							}}
						>
							<Paper
								elevation={5}
								sx={{
									backgroundColor: '#B8314F',
									p: 2,
									maxWidth: '431px'
								}}
							>
								{DamageRelationContent(damageRelation)}
							</Paper>
						</HoverPopover>
						<Box
							{...bindHover(popupState)}
							sx={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								width: '100%',
							}}
						>
							{TypeBoxes}
						</Box>
					</>
				)}
			</PopupState>
		);
	} else {
		const typeName = typeNames[0] as keyof Types;
		let damageRelation: DamageRelation = {
			noDamageFrom: [],
			halfDamageFrom: [],
			doubleDamageFrom: [],
		};

		for (const currentType of types) {
			if (currentType.name === typeName) {
				damageRelation = currentType;
			}
		}

		return (
			<PopupState variant='popover' popupId='singleTypePopup'>
				{(popupState) => (
					<>
						<HoverPopover
							{...bindPopover(popupState)}
							anchorOrigin={{
								vertical: 'top',
								horizontal: 'center',
							}}
							transformOrigin={{
								vertical: 'bottom',
								horizontal: 'center',
							}}
						>
							{DamageRelationContent(damageRelation)}
						</HoverPopover>
						<Box
							{...bindHover(popupState)}
							sx={{
								width: '40%',
								backgroundColor: typeColors[typeName],
							}}
						>
							<Typography variant='subtitle2' my={1} align='center'>{capitalizeFirstLetter(typeName)}</Typography>
						</Box>
					</>
				)}
			</PopupState>
		);
	}
};
