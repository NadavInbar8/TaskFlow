import React, {useEffect, useState} from 'react';
import {useSelector, useDispatch, shallowEqual} from 'react-redux';

// Images
import userSmallSvg from '../assets/imgs/filter-svgs/user-small-svg.svg';
import noDates from '../assets/imgs/filter-svgs/no-dates.svg';
import overdue from '../assets/imgs/filter-svgs/overdue.svg';
import dueNextDay from '../assets/imgs/filter-svgs/due-next-day.svg';
import dueLater from '../assets/imgs/filter-svgs/due-later.svg';
import noLabels from '../assets/imgs/filter-svgs/no-labels.svg';
import close from '../assets/imgs/close.svg';

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
				{/* <img onClick={() => toggleModal('filter')} src={close} alt='' /> */}
				<button onClick={() => toggleModal('filter')}>x</button>
			</div>
			<hr></hr>
			<form className='filter-form'>
				<h5>Keyword</h5>
				<input className='input-text' onChange={handleChange} name='name' value={filter.name} type='text' />
				<button
					onClick={(ev) => {
						FilterBoard(ev, filter);
					}}>
					Submit
				</button>
				<div className='search-options'>Search cards, members, labels, and more.</div>
				<div className='members'>
					<h5>Members</h5>
				</div>
				<div className='no-members-div flex flex-row'>
					<input className='checkbox' type='checkbox' />
					<div className='filter-container-svg justify-center'>
						<img src={userSmallSvg} alt='user-img' />
					</div>
					<span className='flex align-center'>No members</span>
				</div>
				<br></br>
				<div className='assigned-to-me-div flex flex-row'>
					<input className='checkbox' type='checkbox' />
					<div className='user-avatar flex flex-row justify-center'>OK</div>
					<span className='flex align-center'>Cards assigned to me</span>
				</div>
				<br></br>
				<input className='checkbox' type='checkbox' />
				<select>
					<option value=''>Select Members</option>
					<option value='1'>Oded Kovo</option>
					<option value='2'>Nadav Inbar</option>
					<option value='3'>Tom Ofek Rytt</option>
				</select>
				<h5>Due date</h5>
				<div className='no-dates-div flex flex-row'>
					<input className='checkbox' type='checkbox' />
					<div className='filter-container-svg justify-center'>
						<img src={noDates} alt='user-img' />
					</div>
					<span className='flex align-center'>No dates</span>
				</div>
				<div className='no-members-div flex flex-row'>
					<input className='checkbox' type='checkbox' />
					<div className='filter-container-svg justify-center'>
						<img src={overdue} alt='overdue-img' />
					</div>
					<span className='flex align-center'>Overdue</span>
				</div>
				<div className='no-due-tommorow-div flex flex-row'>
					<input className='checkbox' type='checkbox' />
					<div className='filter-container-svg justify-center'>
						<img src={dueNextDay} alt='due-next-day-img' />
					</div>
					<span className='flex align-center'>Due in the next day</span>
				</div>
				<span className='show-more'>Show more options</span>

				<h5>Labels</h5>
				<div className='no-labels-div flex flex-row'>
					<input className='checkbox' type='checkbox' />
					<div className='filter-container-svg justify-center'>
						<img src={noLabels} alt='no-labels-img' />
					</div>
					<span className='flex align-center'>No labels</span>
				</div>
				<div className='label-div flex'>
					<input className='checkbox' type='checkbox' />
					<div className='green-label inner-label'></div>
				</div>
				<div className='label-div flex'>
					<input className='checkbox' type='checkbox' />
					<div className='red-label inner-label'></div>
				</div>
				<div className='label-div flex'>
					<input className='checkbox' type='checkbox' />
					<div className='blue-label inner-label'></div>
				</div>
				<div className='label-div flex'>
					<input className='checkbox' type='checkbox' />
					<div className='yellow-label inner-label'></div>
				</div>
				<div className='label-div flex'>
					<input className='checkbox' type='checkbox' />
					<div className='pink-label inner-label'></div>
				</div>
			</form>
		</section>
	);
};
