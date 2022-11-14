import view from './viewP.js';
import icons from 'url:../../img/icons.svg';
import previewView from './previewView.js';
class ResultsView extends view {
  parentElement = document.querySelector('.results');
  errorMessage = 'no results found for your request, try again!';
  message = '';
  generateMarkUp() {
    console.log(this.data);
    return this.data.map(result => previewView.render(result, false)).join();
  }
}
//   markUpPreview(result) {
//     //  to give a chosen result class active
//     let id = window.location.hash.slice(1);
//     return `   <li class="preview">
//     <a class="preview__link ${
//       result.id === id ? 'preview__link--active' : ''
//     }" href="#${result.id}">
//       <figure class="preview__fig">
//         <img src=${result.image} alt="${result.title}" />
//       </figure>
//       <div class="preview__data">
//         <h4 class="preview__title">${result.title}...</h4>
//         <p class="preview__publisher">${result.publisher}</p>
//         </div>
//     </a>
//   </li> `;
//   }
// }
export default new ResultsView();
