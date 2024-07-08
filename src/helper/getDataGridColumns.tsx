import { Box, Typography } from '@mui/material';
import type { GridColDef } from '@mui/x-data-grid';
import { AbilitiesCell } from 'components/cells/AbilitiesCell';
import { RemoveCell } from 'components/cells/RemoveCell';
import { RemoveCellHeader } from 'components/cells/RemoveCellHeader';
import { StatCell } from 'components/cells/StatCell';
import { TypesCell } from 'components/cells/TypesCell';
import type { Ability, Type } from 'models/models';

interface getDataGridColumnsProps {
	abilitiesWithDescriptions: Ability[],
	types: Type[]
}

export const getDataGridColumns = ({ abilitiesWithDescriptions, types }: getDataGridColumnsProps): GridColDef[] => {
	return [
		{
			field: 'remove',
			width: 75,
			headerAlign: 'center',
			headerClassName: 'header',
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
			headerClassName: 'header',
			align: 'center',
			renderCell: (param) => <Typography>{param.value}</Typography>
		},
		{
			field: 'sprite',
			headerName: 'Sprite',
			type: 'string',
			width: 125,
			headerAlign: 'center',
			headerClassName: 'header',
			align: 'center',
			renderCell: (param) => <Box component='img' src={param.value} alt='sprite' />
		},
		{
			field: 'types',
			headerName: 'Types',
			type: 'array',
			width: 200,
			headerAlign: 'center',
			headerClassName: 'header',
			align: 'center',
			renderCell: (param) => <TypesCell typeStrings={param.value} types={types} />
		},
		{
			field: 'abilities',
			headerName: 'Abilities',
			type: 'array',
			width: 150,
			headerAlign: 'center',
			headerClassName: 'header',
			align: 'center',
			renderCell: (param) => <AbilitiesCell abilityStrings={param.value} abilities={abilitiesWithDescriptions} />
		},
		{
			field: 'hp',
			headerName: 'HP',
			type: 'number',
			width: 165,
			headerAlign: 'center',
			headerClassName: 'header',
			align: 'center',
			renderCell: (param) => <StatCell statValue={param.value} />
		},
		{
			field: 'attack',
			headerName: 'Attack',
			type: 'number',
			width: 165,
			headerAlign: 'center',
			headerClassName: 'header',
			align: 'center',
			renderCell: (param) => <StatCell statValue={param.value} />
		},
		{
			field: 'defense',
			headerName: 'Defense',
			type: 'number',
			width: 165,
			headerAlign: 'center',
			headerClassName: 'header',
			align: 'center',
			renderCell: (param) => <StatCell statValue={param.value} />
		},
		{
			field: 'specialAttack',
			headerName: 'Special Attack',
			type: 'number',
			width: 165,
			headerAlign: 'center',
			headerClassName: 'header',
			align: 'center',
			renderCell: (param) => <StatCell statValue={param.value} />
		},
		{
			field: 'specialDefense',
			headerName: 'Special Defense',
			type: 'number',
			width: 165,
			headerAlign: 'center',
			headerClassName: 'header',
			align: 'center',
			renderCell: (param) => <StatCell statValue={param.value} />
		},
		{
			field: 'speed',
			headerName: 'Speed',
			type: 'number',
			width: 165,
			headerAlign: 'center',
			headerClassName: 'header',
			align: 'center',
			renderCell: (param) => <StatCell statValue={param.value} />
		},
	];
};
