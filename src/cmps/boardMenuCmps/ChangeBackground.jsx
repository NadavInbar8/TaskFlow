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
			const imgs = await unsplashService.search('mountains', 10);
			setImgs(imgs);
		} catch (err) {
			console.log('couldnt get imgs', err);
		}
	};

	const handleChange = ({target}) => {
		const {value} = target;
		setSearchVal(value);
		if (value.length > 3) searchImgs(value);
	};

	const searchImgs = async (value) => {
		if (searchVal.length < 3) getImgs();
		try {
			console.log(value);
			const imgs = await unsplashService.search(value, 10);
			setImgs(imgs);
		} catch (err) {
			console.log('couldnt get imgs', err);
		}
	};

	return (
		<section className='background-div'>
			<input type='text' placeholder='Photos' className='search-imgs-input' onInput={(ev) => handleChange(ev)} />
			<div className='imgs'>
				{imgs.map((img) => (
					<div key={img.id} className='img-container flex flex-center' onClick={() => changeBG('img', img)}>
						<img className='unsplash-img' src={img.preview} alt={img.id} />
					</div>
				))}
			</div>
			<hr />
			<div className='colors'>
				<Colors parentCmp='boardMenu' changeBG={changeBG} />
			</div>
		</section>
	);
};
