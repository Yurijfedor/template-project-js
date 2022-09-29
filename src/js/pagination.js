class Pagination {
  constructor({
    currentPage = 1,
    totalPages = 1,
    containerSelector = 'body',
    onPageChange,
  }) {
    this.currentPage = currentPage;
    this.totalPages = totalPages;
    this.container = document.querySelector(containerSelector);
    this.onPageChange = onPageChange;
  }

  init() {
    this.render();
    this.setEvents();
  }

  render() {
    let itemsTemplate = '';
    for (let i = this.currentPage; i <= this.totalPages; i += 1) {
      const template = ` <a href="#" data-page="${i}" class="${
        i === this.currentPage ? 'active' : ''
      }">${i}</a>`;

      itemsTemplate += template;
    }

    const fullPaginationTemplate = `
      <div class="pagination" id="pagination">
      <a href="#" class="pagination__arrow pagination__arrow_prev"></a>
        ${itemsTemplate}
        <a href="#" class="pagination__arrow pagination__arrow_next"></a>
      </div>`;

    this.container.insertAdjacentHTML('beforeend', fullPaginationTemplate);
  }

  setEvents() {
    this.container.addEventListener('click', evt => {
      evt.preventDefault();
      const pageNumber = evt.target.dataset.page;
      const activePage = this.container.querySelector('.active');

      activePage.classList.remove('active');

      this.currentPage = Number(pageNumber);
      evt.target.classList.add('active');

      if (typeof this.onPageChange === 'function') {
        this.onPageChange(this.currentPage);
      }
    });
  }
}

export default Pagination;
