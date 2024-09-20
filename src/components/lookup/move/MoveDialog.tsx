import { Box, Dialog, DialogTitle, List, ListItem, Typography } from '@mui/material';
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
		<Dialog open={isMoveDialogOpen} onClose={onClose} sx={{ p: 3 }}>
			<DialogTitle>
				<Typography>
					{move.name}
				</Typography>
				<Box
					component='img'
					src={`src/assets/types/${move.type}.png`}
					alt='type'
				/>
			</DialogTitle>
			<List>
				<ListItem>
					<Typography>
						{move.description}
					</Typography>
				</ListItem>
				<ListItem>
					<Typography>
						accuracy: {move.accuracy}
					</Typography>
				</ListItem>
				<ListItem>
					<Typography>
						ailment: {move.ailment}
					</Typography>
				</ListItem>
				<ListItem>
					<Typography>
						class: {move.damageClass}
					</Typography>
					<Box
						component='img'
						src={`src/assets/damage-class/${move.damageClass}.png`}
						alt='type'
					/>
				</ListItem>
				<ListItem>
					<Typography>
						effectChance: {move.effectChance}
					</Typography>
				</ListItem>
				<ListItem>
					<Typography>
						category: {move.category}
					</Typography>
				</ListItem>
				<ListItem>
					<Typography>
						crit rate: {move.critRate}
					</Typography>
				</ListItem>
				<ListItem>
					<Typography>
						isContact: {move.isContact ? 'true' : 'false'}
					</Typography>
				</ListItem>
				<ListItem>
					<Typography>
						crit rate: {move.critRate}
					</Typography>
				</ListItem>
				<ListItem>
					<Typography>
						crit rate: {move.critRate}
					</Typography>
				</ListItem>
				<ListItem>
					<Typography>
						crit rate: {move.critRate}
					</Typography>
				</ListItem>
				<ListItem>
					<Typography>
						crit rate: {move.critRate}
					</Typography>
				</ListItem>
				<ListItem>
					<Typography>
						crit rate: {move.critRate}
					</Typography>
				</ListItem>
			</List>
		</Dialog>
	);
};
