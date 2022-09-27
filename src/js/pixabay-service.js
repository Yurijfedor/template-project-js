import axios from 'axios';
export default class PixabayApiService {
  constructor() {
    this.searchQuery = '';
    this.page = 1;
    this.per_page = 20;
  }

  async fetchPictures() {
    try {
      const BASE_URL = 'https://api.themoviedb.org/3/';
      const API_KEY = 'b4a549abb798b19dbb7e63335d135053';
      const options = new URLSearchParams({
        // type: 'search',
        // search_type: 'movie',
        // image_type: 'photo',
        // orientation: 'horizontal',
        // safesearch: 'false',
        // per_page: this.per_page,
        api_key: API_KEY,
        language: 'en-US',
        query: this.searchQuery,
        page: this.page,
      });

      const response = await axios.get(`${BASE_URL}saerch/movie?${options}`);
      return response;
    } catch (error) {
      console.log(error.message);
    }
  }

  get query() {
    return this.searchQuery;
  }

  set query(newQuery) {
    this.searchQuery = newQuery;
  }

  incrementPage() {
    this.page += 1;
  }

  resetPage() {
    this.page = 1;
  }
}
