import { Box, Typography } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import { AbilitiesCell } from 'components/data-grid/cells/AbilitiesCell';
import { RemoveCell } from 'components/data-grid/cells/RemoveCell';
import { RemoveCellHeader } from 'components/data-grid/cells/RemoveCellHeader';
import { StatCell } from 'components/data-grid/cells/StatCell';
import { TotalCell } from 'components/data-grid/cells/TotalCell';
import { TypesCell } from 'components/data-grid/cells/TypesCell';
import type { Ability, Type } from 'models/models';

interface getDataGridColumnsProps {
	abilitiesWithDescriptions: Ability[];
	types: Type[];
}

export const getDataGridColumns = ({ abilitiesWithDescriptions, types }: getDataGridColumnsProps): GridColDef[] => {
	return [
		{
			field: 'remove',
			width: 75,
			headerAlign: 'center',
			align: 'center',
			sortable: false,
			filterable: false,
			disableColumnMenu: true,
			disableReorder: true,
			renderHeader: () => <RemoveCellHeader />,
			renderCell: (param) => <RemoveCell name={param.row.originalName} />
		},
		{
			field: 'name',
			type: 'string',
			width: 150,
			headerAlign: 'center',
			align: 'center',
			display: 'flex',
			renderCell: (param) => <Typography variant='subtitle2' whiteSpace='normal'>{param.value}</Typography>,
			renderHeader: () => <Typography variant='subtitle1'>Name</Typography>
		},
		{
			field: 'sprite',
			type: 'string',
			width: 150,
			headerAlign: 'center',
			align: 'center',
			display: 'flex',
			renderCell: (param) => <Box component='img' src={param.value} alt='sprite' />,
			renderHeader: () => <Typography variant='subtitle1'>Sprite</Typography>
		},
		{
			field: 'types',
			type: 'string',
			width: 275,
			headerAlign: 'center',
			align: 'center',
			display: 'flex',
			renderCell: (param) => <TypesCell typeNames={param.value} types={types} />,
			renderHeader: () => <Typography variant='subtitle1'>Types</Typography>
		},
		{
			field: 'abilities',
			type: 'string',
			width: 150,
			headerAlign: 'center',
			align: 'center',
			display: 'flex',
			renderCell: (param) => <AbilitiesCell abilityStrings={param.value} abilities={abilitiesWithDescriptions} />,
			renderHeader: () => <Typography variant='subtitle1'>Abilities</Typography>
		},
		{
			field: 'hp',
			type: 'number',
			width: 210,
			headerAlign: 'center',
			align: 'center',
			display: 'flex',
			renderCell: (param) => <StatCell statValue={param.value} />,
			renderHeader: () => <Typography variant='subtitle1'>HP</Typography>
		},
		{
			field: 'attack',
			type: 'number',
			width: 210,
			headerAlign: 'center',
			align: 'center',
			display: 'flex',
			renderCell: (param) => <StatCell statValue={param.value} />,
			renderHeader: () => <Typography variant='subtitle1'>Attack</Typography>
		},
		{
			field: 'defense',
			type: 'number',
			width: 210,
			headerAlign: 'center',
			align: 'center',
			display: 'flex',
			renderCell: (param) => <StatCell statValue={param.value} />,
			renderHeader: () => <Typography variant='subtitle1'>Defense</Typography>
		},
		{
			field: 'specialAttack',
			type: 'number',
			width: 210,
			headerAlign: 'center',
			align: 'center',
			display: 'flex',
			renderCell: (param) => <StatCell statValue={param.value} />,
			renderHeader: () => <Typography variant='subtitle1'>Special Attack</Typography>
		},
		{
			field: 'specialDefense',
			type: 'number',
			width: 210,
			headerAlign: 'center',
			align: 'center',
			display: 'flex',
			renderCell: (param) => <StatCell statValue={param.value} />,
			renderHeader: () => <Typography variant='subtitle1'>Special Defense</Typography>
		},
		{
			field: 'speed',
			type: 'number',
			width: 210,
			headerAlign: 'center',
			align: 'center',
			display: 'flex',
			renderCell: (param) => <StatCell statValue={param.value} />,
			renderHeader: () => <Typography variant='subtitle1'>Speed</Typography>
		},
		{
			field: 'total',
			type: 'number',
			width: 115,
			headerAlign: 'center',
			align: 'center',
			display: 'flex',
			renderCell: (param) => <TotalCell totalValue={param.value} />,
			renderHeader: () => <Typography variant='subtitle1'>Total</Typography>
		}
	];
};
