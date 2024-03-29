import React, {  useEffect, useState } from 'react';
import { DataGrid, GridRenderCellParams } from '@mui/x-data-grid';
import { Person } from '@/models';
import { Checkbox } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import { addFavorite } from '@/redux/states';
import  { AppStore } from '@/redux/store';

export type PeopleTablesProps = {
	// types...
}

const PeopleTables: React.FC<PeopleTablesProps> = () => {
	const [selectedPeople, setSelectedPeople] = useState<Person[]>([]) 
	const pageSize = 5
	const dispatch = useDispatch()
	const statePeople = useSelector((store: AppStore) => store.people)
	const favoritePeople = useSelector((store: AppStore) => store.favorites)

	const findPerson = (person: Person) => !!favoritePeople.find(p => p.id === person.id)
	const filterPerson = (person: Person) => favoritePeople.filter(p => p.id !== person.id)

	const handleChange = (person: Person) => {
		const filteredPeople = findPerson(person) ? filterPerson(person) : [...selectedPeople, person]
		dispatch(addFavorite(filteredPeople))
		setSelectedPeople(filteredPeople)
	}
	const columns = [
		{
			field: 'actions',
			type: 'actions',
			sortable: false,
			headerName: '',
			width: 50,
			renderCell: (params: GridRenderCellParams) => <>{
				<Checkbox 
					size='small' 
					checked={findPerson(params.row)} 
					onChange={() => handleChange(params.row)}
				/>
			} </>
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

	useEffect(() => {
		setSelectedPeople(favoritePeople)
	}, [favoritePeople])

	return (
		<DataGrid
			rows={statePeople}
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

export default PeopleTables;
