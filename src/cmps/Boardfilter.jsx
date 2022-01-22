import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';

// import {setFilterBy} from '../store/board.action.js';

export const BoardFilter = ({FilterBoard, toggleModal}) => {
	const [filter, setFilter] = useState({
		name: '',
	});

	// const {board} = useSelector((state) => ({board: state.boardModule.currBoard}), shallowEqual);

	// useEffect(() => {
	// 	console.log(boardId);
	// 	dispatch(loadBoard(boardId));
	// }, []);

	async function handleChange({target}) {
		const field = target.name;
		const value = target.value;
		// console.log(field, value);
		setFilter({...filter, [field]: value});
	}

	return (
		<section className='board-filter'>
			<div className='modal-top'>
				<h3>Filter</h3>
				<button onClick={() => toggleModal('filter')}>x</button>
			</div>
			<hr></hr>
			<form className='filter-form'>
				<h5>Keyword</h5>
				<input onChange={handleChange} name='name' value={filter.name} type='text' />
				<button
					onClick={(ev) => {
						FilterBoard(ev, filter);
					}}>
					Submit
				</button>
				<div className='search-options'>Search cards, members, labels, and more.</div>
				<div className='members'>Members</div>
				<select>
					<option value='1'>Member 1</option>
					<option value='2'>Member 2</option>
					<option value='3'>Member 3</option>
				</select>
			</form>
		</section>
	);
};
