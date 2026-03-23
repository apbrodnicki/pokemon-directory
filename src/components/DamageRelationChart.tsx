import { Box, Typography } from '@mui/material';
import { typeColors } from 'data';
import { capitalizeFirstLetter } from 'helper/helper';
import type { DamageRelationFrom, DamageRelationTo, Types } from 'models/models';

export const DamageRelationFromContent = (damageRelationFrom: DamageRelationFrom): React.JSX.Element => (
	<>
		{damageRelationFrom.noDamageFrom.length > 0 && (
			DamageRelationElement('Immune to (0x):', damageRelationFrom.noDamageFrom)
		)}
		{damageRelationFrom.quarterDamageFrom !== undefined && damageRelationFrom.quarterDamageFrom.length > 0 && (
			DamageRelationElement('Strongly resists (.25x):', damageRelationFrom.quarterDamageFrom)
		)}
		{damageRelationFrom.halfDamageFrom.length > 0 && (
			DamageRelationElement('Resists (.5x):', damageRelationFrom.halfDamageFrom)
		)}
		{damageRelationFrom.doubleDamageFrom.length > 0 && (
			DamageRelationElement('Weak to (2x):', damageRelationFrom.doubleDamageFrom)
		)}
		{damageRelationFrom.quadrupleDamageFrom !== undefined && damageRelationFrom.quadrupleDamageFrom.length > 0 && (
			DamageRelationElement('Very weak to (4x):', damageRelationFrom.quadrupleDamageFrom)
		)}
	</>
);

export const DamageRelationToContent = (damageRelationTo: DamageRelationTo): React.JSX.Element => (
	<>
		{damageRelationTo.noDamageTo !== undefined && damageRelationTo.noDamageTo.length > 0 && (
			DamageRelationElement('No effect (0x):', damageRelationTo.noDamageTo)
		)}
		{damageRelationTo.halfDamageTo !== undefined && damageRelationTo.halfDamageTo.length > 0 && (
			DamageRelationElement('Not very effective (.5x):', damageRelationTo.halfDamageTo)
		)}
		{damageRelationTo.doubleDamageTo !== undefined && damageRelationTo.doubleDamageTo.length > 0 && (
			DamageRelationElement('Super effective (2x):', damageRelationTo.doubleDamageTo)
		)}
	</>
);

const DamageRelationElement = (title: string, damageRelationTypes: string[]): React.JSX.Element => (
	<Box mb={1}>
		<Box>
			<Typography variant='subtitle2' fontWeight='medium'>
				{title}
			</Typography>
		</Box>
		<Box display='flex' flexWrap='wrap' py={.5}>
			{damageRelationTypes.map((type: string, index: number) => (
				<Box
					key={index}
					bgcolor={typeColors[type as keyof Types]}
					sx={{ width: { xs: '50%', sm: '33%' } }}
				>
					<Box
						mx={3}
						my={1}
						display='flex'
						alignItems='center'
						justifyContent='center'
					>
						<Typography variant='subtitle2' fontWeight='regular'>
							{capitalizeFirstLetter(type)}
						</Typography>
					</Box>
				</Box>
			))}
		</Box>
	</Box>
);
