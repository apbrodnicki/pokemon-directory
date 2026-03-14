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
					{move.name} (Move)
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
				<Typography variant='body1'>Description</Typography>
			</Divider>
			<DialogContent>
				<DialogContentText>
					{move.description}
				</DialogContentText>
			</DialogContent>
			<Divider textAlign='left'>
				<Typography variant='body1'>Stats</Typography>
			</Divider>
			<DialogContent>
				{move.power && (
					<DialogContentText>
						Power: {move.power}
					</DialogContentText>
				)}
				<DialogContentText>
					Accuracy: {move.accuracy}%
				</DialogContentText>
				<DialogContentText>
					Priority: {move.priority}
				</DialogContentText>
				<DialogContentText>
					PP: {move.powerPoints}
				</DialogContentText>
				{move.category && (
					<DialogContentText>
						Category: {move.category}
					</DialogContentText>
				)}
				{move.ailment && (
					<DialogContentText>
						Ailment: {move.ailment}
					</DialogContentText>
				)}
				<DialogContentText>
					Makes contact?: {move.isContact ? 'yes' : 'no'}
				</DialogContentText>
				{move.critRate && (
					<DialogContentText>
						Crit rate: {move.critRate}
					</DialogContentText>
				)}
				{move.flinchChance && (
					<DialogContentText>
						Flinch chance: {move.flinchChance}
					</DialogContentText>
				)}
				<DialogContentText>
					Target: {move.target}
				</DialogContentText>
			</DialogContent>
			<Divider textAlign='left'>
				<Typography variant='body1'>Stat changes</Typography>
			</Divider>
			<DialogContent>
				{move.statChanges.map((statChange, index) => (
					<DialogContentText key={index}>
						{capitalizeFirstLetter(statChange.stat)} ({statChange.change > 0 && '+'}{statChange.change} stage{statChange.change > 1 && 's'})
					</DialogContentText>
				))}
			</DialogContent>
			{move.drain && (
				<DialogContentText>
					Drain: {move.drain}
				</DialogContentText>
			)}
			{move.healing && (
				<DialogContentText>
					Healing: {move.healing}
				</DialogContentText>
			)}
			{move.maxHits && (
				<DialogContentText>
					Max hits: {move.maxHits}
				</DialogContentText>
			)}
			{move.minHits && (
				<DialogContentText>
					Min hits: {move.minHits}
				</DialogContentText>
			)}
			{move.maxTurns && (
				<DialogContentText>
					Max turns: {move.maxTurns}
				</DialogContentText>
			)}
			{move.minTurns && (
				<DialogContentText>
					Min turns: {move.minTurns}
				</DialogContentText>
			)}
		</StyledDialog>
	);
};
