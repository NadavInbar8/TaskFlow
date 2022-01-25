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
		<div className='color-modal'>
			<section className='color-modal-layout'>
				<div className='modal-top'>
					<span> </span>
					<span>Colors</span>
					<button
						onClick={() => {
							toggleModal('color');
						}}>
						x
					</button>
				</div>
				<h3>Colors</h3>
				<hr />
				<section className='color-modal-colors'>
					{console.log(colors)}
					{colors.map((color, idx) => {
						console.log(color);
						return <div onClick={() => saveColor(color)} key={idx} className={color + ' ' + 'color-to-show'}></div>;
					})}
				</section>
			</section>
		</div>
	);
}
