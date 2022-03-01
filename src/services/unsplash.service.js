import axios from 'axios';

import KEYS from '../keys.js';

export const unsplashService = {
  search,
};

const query = async (searchVal, amount) => {
  const res = await axios.get(
    `https://api.unsplash.com/search/photos?query=${searchVal}&per_page=${amount}&orientation=landscape&client_id=${KEYS.unsplashKey}`
  );
  return res.data;
};

async function search(searchVal, amount) {
  const { results } = await query(searchVal, amount);
  return Promise.resolve(
    results.map((pic) => {
      return { id: pic.id, preview: pic.urls.small, full: pic.urls.full };
    })
  );
}
