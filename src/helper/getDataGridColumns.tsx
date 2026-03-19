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
			headerName: 'Name',
			type: 'string',
			width: 250,
			headerAlign: 'center',
			align: 'center',
			display: 'flex',
			renderCell: (param) => <Box><Typography variant='subtitle1'>{param.value}</Typography></Box>
		},
		{
			field: 'sprite',
			headerName: 'Sprite',
			type: 'string',
			width: 125,
			headerAlign: 'center',
			align: 'center',
			display: 'flex',
			renderCell: (param) => <Box component='img' src={param.value} alt='sprite' />
		},
		{
			field: 'types',
			headerName: 'Types',
			type: 'string',
			width: 275,
			headerAlign: 'center',
			align: 'center',
			display: 'flex',
			renderCell: (param) => <TypesCell typeStrings={param.value} types={types} />
		},
		{
			field: 'abilities',
			headerName: 'Abilities',
			type: 'string',
			width: 175,
			headerAlign: 'center',
			align: 'center',
			display: 'flex',
			renderCell: (param) => <AbilitiesCell abilityStrings={param.value} abilities={abilitiesWithDescriptions} />
		},
		{
			field: 'hp',
			headerName: 'HP',
			type: 'number',
			width: 165,
			headerAlign: 'center',
			align: 'center',
			display: 'flex',
			renderCell: (param) => <StatCell statValue={param.value} />
		},
		{
			field: 'attack',
			headerName: 'Attack',
			type: 'number',
			width: 165,
			headerAlign: 'center',
			align: 'center',
			display: 'flex',
			renderCell: (param) => <StatCell statValue={param.value} />
		},
		{
			field: 'defense',
			headerName: 'Defense',
			type: 'number',
			width: 165,
			headerAlign: 'center',
			align: 'center',
			display: 'flex',
			renderCell: (param) => <StatCell statValue={param.value} />
		},
		{
			field: 'specialAttack',
			headerName: 'Special Attack',
			type: 'number',
			width: 165,
			headerAlign: 'center',
			align: 'center',
			display: 'flex',
			renderCell: (param) => <StatCell statValue={param.value} />
		},
		{
			field: 'specialDefense',
			headerName: 'Special Defense',
			type: 'number',
			width: 165,
			headerAlign: 'center',
			align: 'center',
			display: 'flex',
			renderCell: (param) => <StatCell statValue={param.value} />
		},
		{
			field: 'speed',
			headerName: 'Speed',
			type: 'number',
			width: 165,
			headerAlign: 'center',
			align: 'center',
			display: 'flex',
			renderCell: (param) => <StatCell statValue={param.value} />
		},
		{
			field: 'total',
			headerName: 'Total',
			type: 'number',
			width: 100,
			headerAlign: 'center',
			align: 'center',
			display: 'flex',
			renderCell: (param) => <TotalCell totalValue={param.value} />
		}
	];
};
