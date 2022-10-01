const axios = require('axios');

export default class TmdbApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
  }

  async fetchMovie() {
    try {
      const POPULAR_MOVIE_REGUEST =
        'https://api.themoviedb.org/3/trending/movie/week';
      const API_KEY = '5fe2b2c003e2bf661ee6b8424d931ac2';
      const options = new URLSearchParams({
        api_key: API_KEY,
        query: this.searchQuery,
        page: this.page,
      });

      // const movies = await axios.get(`${BASE_URL}search/movie?${options}`);
      const movies = await axios.get(`${POPULAR_MOVIE_REGUEST}?${options}`);

      return movies;
    } catch (error) {
      console.log(error.message);
    }
  }

  incrementPage() {
    this.page += 1;
  }

  decrementPage() {
    this.page -= 1;
  }

  resetPage() {
    this.page = 1;
  }

  setPage(newPage) {
    this.page = newPage;
  }
}
