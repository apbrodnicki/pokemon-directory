import { Box, Typography } from '@mui/material';
import { typeColors } from 'data';
import { capitalizeFirstLetter } from 'helper/helper';
import type { DamageRelation, Types } from 'models/models';

export const DamageRelationContent = (damageRelation: DamageRelation): React.JSX.Element => (
	<>
		{damageRelation.noDamageFrom.length > 0 && (
			DamageRelationElement('Immune to (0x):', damageRelation.noDamageFrom)
		)}
		{damageRelation.quarterDamageFrom !== undefined && damageRelation.quarterDamageFrom.length > 0 && (
			DamageRelationElement('Strongly resists (.25x):', damageRelation.quarterDamageFrom)
		)}
		{damageRelation.halfDamageFrom.length > 0 && (
			DamageRelationElement('Resists (.5x):', damageRelation.halfDamageFrom)
		)}
		{damageRelation.doubleDamageFrom.length > 0 && (
			DamageRelationElement('Weak to (2x):', damageRelation.doubleDamageFrom)
		)}
		{damageRelation.quadrupleDamageFrom !== undefined && damageRelation.quadrupleDamageFrom.length > 0 && (
			DamageRelationElement('Very weak to (4x):', damageRelation.quadrupleDamageFrom)
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
