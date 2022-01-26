import React, {useEffect, useState} from 'react';

import {Colors} from '../boardCmps/Colors.jsx';

import {unsplashService} from '../../services/unsplash.service.js';

export const ChangeBackground = ({changeBG}) => {
	const [searchVal, setsearchVal] = useState('');
	const [imgs, setImgs] = useState([]);

	useEffect(async () => {
		getImgs();
	}, []);

	const getImgs = async () => {
		try {
			const imgs = await unsplashService.search('forest');
			setImgs(imgs);
		} catch (err) {
			console.log('couldnt get imgs', err);
		}
	};

	return (
		<section className='background-div'>
			<input type='text' placeholder='Search images' />
			<div className='imgs'>
				{imgs.map((img) => (
					<div key={img.id} className='img-container flex flex-center' onClick={() => changeBG('img', img.full)}>
						<img className='unsplash-img' src={img.preview} alt={img.id} />
					</div>
				))}
			</div>
			<hr></hr>
			<div className='colors'>
				<Colors parentCmp='sideMenu' changeBG={changeBG} />
			</div>
		</section>
	);
};
