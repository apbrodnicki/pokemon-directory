import { Box, DialogContent, DialogContentText, DialogTitle, Divider, Typography } from '@mui/material';
import { ImagesDamageClasses, ImagesTypes } from 'assets/index.ts';
import { StyledDialog } from 'components/custom/Styles';
import { defaultMove } from 'data';
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
			<Divider />
			<DialogContent>
				<DialogContentText>
					Power: {move.power}
				</DialogContentText>
				<DialogContentText>
					Accuracy: {move.accuracy}%
				</DialogContentText>
			</DialogContent>
			<DialogContent>
				<DialogContentText>
					ailment: {move.ailment}
				</DialogContentText>
				<DialogContentText>
					category: {move.category}
				</DialogContentText>
				<DialogContentText>
					crit rate: {move.critRate}
				</DialogContentText>
				<DialogContentText>
					flinch chance: {move.flinchChance}
				</DialogContentText>
				<DialogContentText>
					is contact: {move.isContact ? 'yes' : 'no'}
				</DialogContentText>
				<DialogContentText>
					target: {move.target}
				</DialogContentText>
				<DialogContentText>
					priority: {move.priority}
				</DialogContentText>
				<DialogContentText>
					pp: {move.powerPoints}
				</DialogContentText>
			</DialogContent>
			<DialogContent dividers>
				{move.statChanges.map((statChange, index) => (
					<DialogContentText key={index}>
						stat change | {statChange.stat}: {statChange.change}
					</DialogContentText>
				))}
				<DialogContentText>
					stat change chance: {move.statChangeChance}
				</DialogContentText>
			</DialogContent>
			<DialogContent>
				<DialogContentText>
					drain: {move.drain}
				</DialogContentText>
				<DialogContentText>
					healing: {move.healing}
				</DialogContentText>
			</DialogContent>
			<DialogContent>
				<DialogContentText>
					max hits: {move.maxHits}
				</DialogContentText>
				<DialogContentText>
					min hits: {move.minHits}
				</DialogContentText>
				<DialogContentText>
					max turns: {move.maxTurns}
				</DialogContentText>
				<DialogContentText>
					min turns: {move.minTurns}
				</DialogContentText>
			</DialogContent>
		</StyledDialog>
	);
};
