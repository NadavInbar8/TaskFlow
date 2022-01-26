import axios from 'axios';

const API_KEY = 'yugHKxfZSxSTP9SjYoqSRt6o0c3oAKMLgFjsB3G4KB4';

export const unsplashService = {
	search,
	getInitialImgs,
};

const query = async (searchVal) => {
	const res = await axios.get(
		`https://api.unsplash.com/search/photos?query=${searchVal}&orientation=landscape&client_id=${API_KEY}`
	);
	return res.data;
};

async function search(searchVal) {
	const {results} = await query(searchVal);
	return Promise.resolve(
		results.map((pic) => {
			return {id: pic.id, preview: pic.urls.small, full: pic.urls.full};
		})
	);
}

async function getInitialImgs(searchVal) {
	const {results} = await query(searchVal);
	return Promise.resolve(
		results.map((pic) => {
			return {id: pic.id, preview: pic.urls.small, full: pic.urls.full};
		})
	);
}
