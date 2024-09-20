import { Box, Dialog, DialogTitle, List, ListItem, Typography } from '@mui/material';
import { LookupDialogContext } from 'contexts/LookupDialogContext';
import { MoveDialogContext } from 'contexts/MoveDialogContext';
import { defaultMove } from 'data';
import React, { useContext } from 'react';

export const MoveDialog = (): React.JSX.Element => {
	const { isLookupDialogOpen, setIsLookupDialogOpen } = useContext(LookupDialogContext);
	const { move, setMove } = useContext(MoveDialogContext);

	const onClose = (): void => {
		// TODO: fix flashing default move dialog on close
		setIsLookupDialogOpen(false);
		setMove(defaultMove);
	};

	return (
		<Dialog open={isLookupDialogOpen} onClose={onClose} sx={{ p: 3 }}>
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
