import view from './viewP.js';
import icons from 'url:../../img/icons.svg';
class PaginationView extends view {
  parentElement = document.querySelector('.pagination');
  // curPage = this.data.page;

  addHandler(handler) {
    this.parentElement.addEventListener('click', function (e) {
      e.preventDefault();
      // we need to search for a closest button element, because user might not click directly on a button, so we need parent elements.
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      let goToPage = +btn.dataset.goto;
      console.log(goToPage);
      console.log(btn);
      handler(goToPage);
    });
  }
  generateMarkUp() {
    // page 1 and there are other pages
    let curPage = this.data.page;
    let numPages = Math.ceil(
      this.data.results.length / this.data.resultsPerPage
    );
    if (curPage === 1 && numPages > 1) {
      return `
      <button data-goto=" ${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> -->
      `;
    }
    // page 1 and there are no other pages
    // Last page
    if (curPage === numPages && numPages > 1) {
      return `
      <button data-goto=" ${
        curPage - 1
      }" class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>`;
      // other page
    }
    if (curPage < numPages) {
      return (
        `
         <button data-goto=" ${
           curPage - 1
         }"class="btn--inline pagination__btn--prev">
      <svg class="search__icon">
        <use href="${icons}#icon-arrow-left"></use>
      </svg>
      <span>Page ${curPage - 1}</span>
    </button>` +
        `<button data-goto=" ${
          curPage + 1
        }"class="btn--inline pagination__btn--next">
            <span>Page ${curPage + 1}</span>
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-right"></use>
            </svg>
          </button> `
      );
    }
    return ``;
  }
}
export default new PaginationView();
