import { Box, DialogContent, DialogContentText, DialogTitle, Divider, Typography } from '@mui/material';
import { ImagesDamageClasses, ImagesTypes } from 'assets/index.ts';
import { StyledDialog } from 'components/custom/Styles';
import { defaultMove, typeColors } from 'data';
import { capitalizeFirstLetter } from 'helper/helper';
import type { Move, Types } from 'models/models';
import React from 'react';

interface MoveDialogProps {
	move: Move;
	setMove: React.Dispatch<React.SetStateAction<Move>>;
	isMoveDialogOpen: boolean;
}

export const MoveDialog = (
	{ move, setMove, isMoveDialogOpen }: MoveDialogProps
): React.JSX.Element => {
	const onClose = (): void => {
		setMove(defaultMove);
	};

	return (
		<StyledDialog
			open={isMoveDialogOpen}
			onClose={onClose}
			onTransitionExited={() => { setMove(defaultMove); }}
			sx={{
				'& .MuiDialog-paper': {
					width: '100%',
					backgroundColor: typeColors[move.type as keyof Types]
				}
			}}
		>
			<Box display='flex' justifyContent='center' alignItems='center' flexDirection='column'>
				<DialogTitle textAlign='center'>
					{move.name}
				</DialogTitle>
				<Box display='flex' justifyContent='center' alignItems='center' width='100%' pb={2}>
					<Box
						component='img'
						src={ImagesTypes[move.type as keyof Types]}
						alt={move.type}
						p={1}
					/>
					<Box
						component='img'
						src={ImagesDamageClasses[move.damageClass]}
						alt={move.damageClass}
						p={1}
					/>
				</Box>
			</Box>
			<Divider textAlign='left'>
				<Typography variant='subtitle1'>Description</Typography>
			</Divider>
			<DialogContent>
				<DialogContentText variant='subtitle2'>
					{move.description}
				</DialogContentText>
			</DialogContent>
			<Divider textAlign='left'>
				<Typography variant='subtitle1'>Stats</Typography>
			</Divider>
			<DialogContent>
				{move.power !== null && (
					<DialogContentText variant='subtitle2'>
						Power: {move.power}
					</DialogContentText>
				)}
				<DialogContentText variant='subtitle2'>
					Accuracy: {move.accuracy}%
				</DialogContentText>
				<DialogContentText variant='subtitle2'>
					Priority: {move.priority}
				</DialogContentText>
				<DialogContentText variant='subtitle2'>
					PP: {move.powerPoints}
				</DialogContentText>
				{move.category && (
					<DialogContentText variant='subtitle2'>
						Category: {move.category}
					</DialogContentText>
				)}
				{move.ailment && (
					<DialogContentText variant='subtitle2'>
						Ailment: {move.ailment}
					</DialogContentText>
				)}
				<DialogContentText variant='subtitle2'>
					Makes contact?: {move.isContact ? 'yes' : 'no'}
				</DialogContentText>
				{move.critRate !== null && (
					<DialogContentText variant='subtitle2'>
						Crit rate: {move.critRate}
					</DialogContentText>
				)}
				{move.flinchChance !== null && (
					<DialogContentText variant='subtitle2'>
						Flinch chance: {move.flinchChance}
					</DialogContentText>
				)}
				<DialogContentText variant='subtitle2'>
					Target: {move.target}
				</DialogContentText>
				{move.drain !== null && (
					<DialogContentText variant='subtitle2'>
						Drain: {move.drain}
					</DialogContentText>
				)}
				{move.healing !== null && (
					<DialogContentText variant='subtitle2'>
						Healing: {move.healing}
					</DialogContentText>
				)}
				{move.maxHits !== null && (
					<DialogContentText variant='subtitle2'>
						Max hits: {move.maxHits}
					</DialogContentText>
				)}
				{move.minHits !== null && (
					<DialogContentText variant='subtitle2'>
						Min hits: {move.minHits}
					</DialogContentText>
				)}
				{move.maxTurns !== null && (
					<DialogContentText variant='subtitle2'>
						Max turns: {move.maxTurns}
					</DialogContentText>
				)}
				{move.minTurns !== null && (
					<DialogContentText variant='subtitle2'>
						Min turns: {move.minTurns}
					</DialogContentText>
				)}
			</DialogContent>
			{move.statChanges.length > 0 && (
				<>
					<Divider textAlign='left'>
						<Typography variant='subtitle1'>Stat changes</Typography>
					</Divider>
					<DialogContent>
						{move.statChanges.map((statChange, index) => (
							<DialogContentText key={index} variant='subtitle2'>
								{capitalizeFirstLetter(statChange.stat)} ({statChange.change > 0 && '+'}{statChange.change} stage{statChange.change > 1 && 's'})
							</DialogContentText>
						))}
					</DialogContent>
				</>
			)}
		</StyledDialog>
	);
};
