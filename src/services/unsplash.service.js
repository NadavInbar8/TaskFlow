import axios from 'axios';

const API_KEY = 'yugHKxfZSxSTP9SjYoqSRt6o0c3oAKMLgFjsB3G4KB4';

export const unsplashService = {
	search,
};

const query = async (searchVal, amount) => {
	const res = await axios.get(
		`https://api.unsplash.com/search/photos?query=${searchVal}&per_page=${amount}&orientation=landscape&client_id=${API_KEY}`
	);
	return res.data;
};

async function search(searchVal, amount) {
	const {results} = await query(searchVal, amount);
	return Promise.resolve(
		results.map((pic) => {
			return {id: pic.id, preview: pic.urls.small, full: pic.urls.full};
		})
	);
}
