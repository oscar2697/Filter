import React, { useEffect } from 'react';
import { People } from '@/data/people';
import { useDispatch } from 'react-redux';
import { addPeople } from '@/redux/states';
import { PeopleTables } from './components';


export type HomeProps = {
	// types...
}

const Home: React.FC<HomeProps> = () => {
	const dispatch = useDispatch()

	useEffect(() => {
		dispatch(addPeople(People))
	}, [])
	

	return (
		<PeopleTables/>
	);
};

export default Home;
