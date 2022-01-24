export function Colors({addColor, toggleModal}) {
	const colors = [
		'bc-blue',
		'bc-orange',
		'bc-dark-green',
		'bc-red',
		'bc-purple',
		'bc-pink',
		'bc-light-green',
		'bc-cyan',
		'bc-grey',
	];

	function saveColor(color) {
		addColor(color);
		toggleModal('color');
	}

	return (
		<div className='details-modal Cover'>
			<section className='cover-modal-layout'>
				<div className='cover-modal-top'>
					<span> </span>
					<h3>Colors</h3>
					<button
						onClick={() => {
							toggleModal('color');
						}}>
						x
					</button>
				</div>
				<h3>Colors</h3>
				<hr />
				<section className='cover-modal-colors'>
					{console.log(colors)}
					{colors.map((color, idx) => {
						console.log(color);
						return <div onClick={() => saveColor(color)} key={idx} className={color + ' ' + 'cover-to-show'}></div>;
					})}
				</section>
			</section>
		</div>
	);
}
