import view from './viewP.js';
import icons from 'url:../../img/icons.svg';
class AddRecipeView extends view {
  parentElement = document.querySelector('.upload');
  message = 'recipe was successfully uploaded';
  window = document.querySelector('.add-recipe-window');
  overlay = document.querySelector('.overlay');
  btnOpen = document.querySelector('.nav__btn--add-recipe');
  btnClose = document.querySelector('.btn--close-modal');
  handlerUpload;
  constructor() {
    // we use SUPER because it is a child class
    super();
    this.addHandlerShowWindow();
    this.addHandlerHideWindow();
  }
  toggleWindow() {
    this.overlay.classList.toggle('hidden');
    this.window.classList.toggle('hidden');
  }
  hideWindow() {
    this.overlay.classList.add('hidden');
    this.window.classList.add('hidden');
  }

  setHandlerUpload(handlerUpload) {
    this.handlerUpload = handlerUpload;
  }
  //   we cannot use .this inside of a handler function because THIS on a handler function points to the element this listener
  //    is attached to. so we need to export this function to anothe rmethod and call it. so we write function toggleWindow()
  //   we also set manually this keyword in the function with bind method.
  addHandlerShowWindow() {
    this.btnOpen.addEventListener('click', this.toggleWindow.bind(this));
    //   this.overlay.classList.toggle('hidden');
    //   this.window.classList.toggle('hidden');
  }
  addHandlerHideWindow() {
    this.btnClose.addEventListener('click', this.onWindowClosed.bind(this));
    this.overlay.addEventListener('click', this.onWindowClosed.bind(this));
  }
  onWindowClosed() {
    this.hideWindow();
    this.generateMarkUp();
  }
  addHandlerUpload(handler) {
    this.parentElement.addEventListener('submit', function (e) {
      e.preventDefault();
      //   here we need to pass in an element that is a form. here, it is THIS keyword
      //   becuse we are inside a handler function and THIS points to this.parentElement, which is the upload form
      //   we spread the object into an array that contains all the fields with values there
      let dataArr = [...new FormData(this)];
      //   to convert array into object
      let data = Object.fromEntries(dataArr);
      // setTimeout(function () {
      //   toggleWindow();
      // }, 3000);
      handler(data);
    });
  }

  resetElements() {
    this.parentElement = document.querySelector('.upload');
    this.btnClose = document.querySelector('.btn--close-modal');
  }

  generateMarkUp() {
    let markUp = `
      <button class="btn--close-modal">&times;</button>
      <form class="upload">
        <div class="upload__column">
          <h3 class="upload__heading">Recipe data</h3>
          <label>Title</label>
          <input value="TESTr69" required name="title" type="text" />
          <label>URL</label>
          <input value="TEST99" required name="sourceUrl" type="text" />
          <label>Image URL</label>
          <input value="TEST99" required name="image" type="text" />
          <label>Publisher</label>
          <input value="TEST7" required name="publisher" type="text" />
          <label>Prep time</label>
          <input value="23" required name="cookingTime" type="number" />
          <label>Servings</label>
          <input value="23" required name="servings" type="number" />
        </div>

        <div class="upload__column">
          <h3 class="upload__heading">Ingredients</h3>
          <label>Ingredient 1</label>
          <input
            value="0.5,kg,Rice"
            type="text"
            required
            name="ingredient-1"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 2</label>
          <input
            value="1,,Avocado"
            type="text"
            name="ingredient-2"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 3</label>
          <input
            value=",,salt"
            type="text"
            name="ingredient-3"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 4</label>
          <input
            type="text"
            name="ingredient-4"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 5</label>
          <input
            type="text"
            name="ingredient-5"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
          <label>Ingredient 6</label>
          <input
            type="text"
            name="ingredient-6"
            placeholder="Format: 'Quantity,Unit,Description'"
          />
        </div>

        <button class="btn upload__btn">
          <svg>
            <use href="src/img/icons.svg#icon-upload-cloud"></use>
          </svg>
          <span>Upload</span>
        </button>
      </form>
    `;
    this.window.innerHTML = markUp;
    this.resetElements();
    this.addHandlerHideWindow();
    this.addHandlerUpload(this.handlerUpload);
  }
}
export default new AddRecipeView();
