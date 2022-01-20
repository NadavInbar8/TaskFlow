import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';

import {loadBoard} from '../store/board.action.js';

export const BoardFilter = () => {
	const [filter, setFilter] = useState({
		name: '',
	});

	function handleChange({target}) {
		const field = target.name;
		const value = target.value;
		// console.log(field, value);
		setFilter({...filter, [field]: value});
		// console.log(card);
	}

	const Dispatch = useDispatch();

	return (
		<section className='board-filter'>
			<h2>Filter</h2>
			<form className='filter-form'>
				<label>
					Keyword
					<input onChange={handleChange} name='name' value={filter.name} type='text' />
				</label>
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
