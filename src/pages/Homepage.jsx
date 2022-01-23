import React from 'react';
import board from '../assets/imgs/board.png';
import hero from '../assets/imgs/homePageImg.jpg';
import {Link} from 'react-router-dom';

export const Homepage = () => {
	return (
		<div className='homepage flex'>
			<section className='hero'>
				<article className='hero-introduce'>
					<div className='hero-headline'>
						Taskflow helps teams move
						<br />
						work forward.
					</div>

					<p className='hero-expand'>
						Collaborate, manage projects, and reach new
						<br />
						productivity peaks. From high rises to the home office,
						<br />
						the way your team works is unique—accomplish it all
						<br />
						with <span className='taskflow'>Taskflow.</span>
					</p>
					<Link to='/workspace'>
						<button>Try Demo Version</button>
					</Link>
				</article>

				<div className='hero-img'>
					<img src={hero} alt='' />
				</div>
			</section>

			<section className='website-preview'>
				<h1>It’s more than work. It’s a way of working together.</h1>
				<div className='img-div'>
					<img className='logo-img-homepage' src={board} alt='logo' />
				</div>
			</section>
		</div>
	);
};
