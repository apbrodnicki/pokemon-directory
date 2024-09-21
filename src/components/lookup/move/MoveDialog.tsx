import { Box, Dialog, DialogContent, DialogContentText, DialogTitle } from '@mui/material';
import { defaultMove } from 'data';
import type { Move } from 'models/models';
import React from 'react';

interface MoveDialogProps {
	move: Move,
	setMove: React.Dispatch<React.SetStateAction<Move>>,
	isMoveDialogOpen: boolean,
	setIsMoveDialogOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const MoveDialog = (
	{ move, setMove, isMoveDialogOpen, setIsMoveDialogOpen }: MoveDialogProps
): React.JSX.Element => {
	const onClose = (): void => {
		// TODO: fix flashing default move dialog on close
		setIsMoveDialogOpen(false);
		setMove(defaultMove);
	};

	return (
		<Dialog
			open={isMoveDialogOpen}
			onClose={onClose}
			sx={{
				p: 3,
				'& .MuiDialog-paper': {
					backgroundColor: '#B8D8D8'
				}
			}}
		>
			<DialogTitle>
				{move.name}
				<Box
					component='img'
					src={`src/assets/types/${move.type}.png`}
					alt='type'
				/>
			</DialogTitle>
			<DialogContent>
				<DialogContent>
					<DialogContentText>
						{move.damageClass}
						<Box
							component='img'
							src={`src/assets/damage-class/${move.damageClass}.png`}
							alt='type'
						/>
					</DialogContentText>
					<DialogContentText>
					power: {move.power}
					</DialogContentText>
					<DialogContentText>
					accuracy: {move.accuracy}
					</DialogContentText>
				</DialogContent>
				<DialogContent>
					<DialogContentText>
					description: {move.description}
					</DialogContentText>
				</DialogContent>
				<DialogContent>
					<DialogContentText>
					ailment: {move.ailment}
					</DialogContentText>
					<DialogContentText>
					effect chance: {move.effectChance}
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
				<DialogContent>
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
			</DialogContent>
		</Dialog>
	);
};
