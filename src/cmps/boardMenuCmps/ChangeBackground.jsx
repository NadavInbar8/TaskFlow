import React, {useEffect, useState} from 'react';

import {Colors} from '../boardCmps/Colors.jsx';

import {unsplashService} from '../../services/unsplash.service.js';

export const ChangeBackground = ({changeBG}) => {
	const [searchVal, setSearchVal] = useState('');
	const [imgs, setImgs] = useState([]);

	useEffect(async () => {
		getImgs();
	}, []);

	const getImgs = async () => {
		try {
			const imgs = await unsplashService.search('wonderful');
			setImgs(imgs);
		} catch (err) {
			console.log('couldnt get imgs', err);
		}
	};

	const handleChange = ({target}) => {
		const {value} = target;
		setSearchVal(value);
		if (value.length < 3) searchImgs();
		else getImgs();
	};

	const searchImgs = async () => {
		try {
			const imgs = await unsplashService.search(searchVal);
			setImgs(imgs);
		} catch (err) {
			console.log('couldnt get imgs', err);
		}
	};

	return (
		<section className='background-div'>
			<input
				type='text'
				placeholder='Search images'
				className='search-imgs-input'
				onChange={(ev) => handleChange(ev)}
			/>
			<div className='imgs'>
				{imgs.map((img) => (
					<div key={img.id} className='img-container flex flex-center' onClick={() => changeBG('img', img.full)}>
						<img className='unsplash-img' src={img.preview} alt={img.id} />
					</div>
				))}
			</div>
			<hr></hr>
			<div className='colors'>
				<Colors parentCmp='boardMenu' changeBG={changeBG} />
			</div>
		</section>
	);
};
