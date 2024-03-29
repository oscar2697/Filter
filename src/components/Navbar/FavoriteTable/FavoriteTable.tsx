import { Person } from '@/models';
import { removeFavorites } from '@/redux/states';
import { AppStore } from '@/redux/store';
import { Delete } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { GridRenderCellParams, DataGrid } from '@mui/x-data-grid';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

export type FavoriteTableProps = {
	// types...
}

const FavoriteTable: React.FC<FavoriteTableProps> = () => {
	const pageSize = 5
	const dispatch = useDispatch()
	const stateFavorite = useSelector((store: AppStore) => store.favorites)

	const handleClick = (person: Person) => {
		dispatch(removeFavorites(person));
	};

	const columns = [
		{
			field: 'actions',
			type: 'actions',
			sortable: false,
			headerName: '',
			width: 50,
			renderCell: (params: GridRenderCellParams) => (
			<>
				{
					<IconButton color="secondary" aria-label="favorites" component="label" onClick={() => handleClick(params.row)}>
						<Delete />
					</IconButton>
				}
			</>
			) 
		},
		{
			field: 'name',
			headerName: 'Name',
			flex: 1,
			minWidth: 150,
			renderCell: (params: GridRenderCellParams) => <>{params.value} </>
		},
		{
			field: 'category',
			headerName: 'Categories',
			flex: 1,
			renderCell: (params: GridRenderCellParams) => <>{params.value} </>
		},
		{
			field: 'company',
			headerName: 'Company',
			flex: 1,
			renderCell: (params: GridRenderCellParams) => <>{params.value} </>
		},
		{
			field: 'levelOfHappiness',
			headerName: 'Level of Happiness',
			flex: 1,
			renderCell: (params: GridRenderCellParams) => <>{params.value} </>
		},
	]
	return (
		<DataGrid
			rows={stateFavorite}
			columns={columns}
			disableColumnSelector
			disableRowSelectionOnClick
			autoHeight
			initialState={{
				pagination: {
					paginationModel: {
						pageSize: 5,
					},
				},
			}}
			rowsPerPageOptions={[pageSize]}
			getRowId={(row: any) => row.id}
		/>
	);
};

export default FavoriteTable;
