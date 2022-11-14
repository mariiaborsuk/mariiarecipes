import view from './viewP.js';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';
class BookmarksView extends view {
  parentElement = document.querySelector('.bookmarks__list');
  errorMessage = 'no bookmarks yet!';
  message = '';
  generateMarkUp() {
    return this.data
      .map(bookmark => previewView.render(bookmark, false))
      .join();
  }
  // generateMarkUpView(result) {
  //   //  to give a chosen result class active
  //   let id = window.location.hash.slice(1);
  //   return `   <li class="preview">
  //   <a class="preview__link ${
  //     result.id === id ? 'preview__link--active' : ''
  //   }" href="#${result.id}">
  //     <figure class="preview__fig">
  //       <img src=${result.image} alt="${result.title}" />
  //     </figure>
  //     <div class="preview__data">
  //       <h4 class="preview__title">${result.title}...</h4>
  //       <p class="preview__publisher">${result.publisher}</p>
  //       </div>
  //   </a>
  // </li> `;
  // }
  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }
}
export default new BookmarksView();
