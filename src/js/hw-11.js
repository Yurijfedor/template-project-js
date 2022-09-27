import axios from 'axios';
import MovieApiService from './api-service';
import throttle from 'lodash.throttle';

const refs = {
  formEl: document.querySelector('.search-form'),
  galleryContainerEl: document.querySelector('.gallery'),
  loaderEl: document.querySelector('.lds-ellipsis'),
};

const movieApiService = new MovieApiService();

refs.formEl.addEventListener('submit', createGallery);

function createGallery(evt) {
  evt.preventDefault();

  clearLastMessage();
  onHideLoader();

  movieApiService.query = evt.currentTarget.elements.searchQuery.value;
  movieApiService.resetPage();

  movieApiService
    .fetchMovie()
    .then(response => {
      onClearGallery();

      const collectionOfMovie = response.data.results;
      if (collectionOfMovie.length === 0) {
        onHideLoader();
      } else if (
        response.data.total_results > 0 &&
        response.data.total_results <= 20
      ) {
        renderGallery(createTemplate(collectionOfMovie));
        initialScroll();
        onHideLoader();
        renderLastMessage();
      } else {
        renderGallery(createTemplate(collectionOfMovie));
        initialScroll();

        if (!isLastpage(response)) {
          window.addEventListener(
            'scroll',
            throttle(() => {
              const wievPortHeight = window.innerHeight;
              const bodyHeight = refs.galleryContainerEl.offsetHeight;
              const currentPosition = window.pageYOffset;
              const endOfPage = wievPortHeight + currentPosition >= bodyHeight;

              if (endOfPage && !isLastpage(response)) {
                onLoadMore();
              }
              return;
            }, 1000)
          );
          onshowLoader();
          return;
        } else {
          onHideLoader();
          renderLastMessage();
          return;
        }
      }
    })
    .catch(error => console.log(error));
}

function createTemplate(collectionOfMovie) {
  let markup = '';
  collectionOfMovie.forEach(
    ({ poster_path, title, original_title, genre_ids, release_date }) => {
      const template = `<div class="thumb"><div class="photo-card">
  <img class=gallery__img src="https://image.tmdb.org/t/p/w500/${poster_path}" width='395' alt="${title}" loading="lazy" /></div>
  
    <h2 class="info-title"><span class="parameter">
      </span> ${original_title}
    </h2>
    <div class="info">
    <p class="info-item"> ${genre_ids} | ${getYear(release_date)}
    </p>
</div>
</div>`;
      markup += template;
    }
  );
  return markup;
}

function renderGallery(markup) {
  refs.galleryContainerEl.insertAdjacentHTML('beforeend', markup);
}

function onLoadMore() {
  movieApiService.incrementPage();
  movieApiService.fetchMovie().then(response => {
    renderGallery(createTemplate(response.data.results));
    initialScroll();

    if (isLastpage(response)) {
      onHideLoader();
      renderLastMessage();
    } else {
      onshowLoader();
    }
  });
}

function onClearGallery() {
  refs.galleryContainerEl.innerHTML = '';
}

function onshowLoader() {
  if (refs.loaderEl.classList.contains('hidden')) {
    refs.loaderEl.classList.remove('hidden');
  }
  return;
}

function onHideLoader() {
  if (!refs.loaderEl.classList.contains('hidden')) {
    refs.loaderEl.classList.add('hidden');
  }
}

function isLastpage(response) {
  const numberOfLastPage = response.data.total_pages;
  return movieApiService.page - 1 === numberOfLastPage;
}

function renderLastMessage() {
  const message = document.createElement('b');
  message.textContent =
    "We're sorry, but you've reached the end of search results.";
  message.classList.add('last-message');
  refs.galleryContainerEl.after(message);
}

function clearLastMessage() {
  const lastEl = document.querySelector('.last-message');
  if (lastEl) {
    lastEl.remove();
  }
  return;
}

function initialScroll() {
  const { height: cardHeight } =
    refs.galleryContainerEl.firstElementChild.getBoundingClientRect();

  window.scrollBy({
    top: cardHeight * 2,
    behavior: 'smooth',
  });
}

async function getGenreslist(arr) {
  let genresArr = [];
  let allGenres = [];
  await axios
    .get(
      `https://api.themoviedb.org/3/genre/movie/list?api_key=262a417f78469232900b1579d8d8e776&language=en-US`
    )
    .then(response => {
      allGenres = response.data.genres;
      allGenres.forEach(e => {
        if (arr.includes(e.id)) {
          genresArr.push(e.name);
        }
      });
      const genres = genresArr.join(', ');
      console.log(genres);
      return genres;
    })

    .catch(error => console.error(error));
}

function getYear(date) {
  const dateRelise = new Date(date);
  const year = dateRelise.getFullYear();
  return year;
}
