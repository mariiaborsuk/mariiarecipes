import icons from 'url:../../img/icons.svg';
export default class View {
  data;
  /**
   *render the received object to the DOM
   * @param {Object| Object[]} data the data to be rendered (recipe) gere we experct Object or an array of objects
   * @param {boolean} [render=true] if false, create markUp string, instead of rendering to the DOM
   * @returns{undefined|string}a markUp string is returne dif render is set to false.
   *@this{object} View instance
   * @author Mariia Borsuk
   * @todo finnish implementation

   */
  render(data, render = true) {
    if (!data || (Array.isArray(data) && data.length === 0))
      return this.renderError();
    this.data = data;
    let markUp = this.generateMarkUp();
    if (!render) return markUp;
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
  clear() {
    this.parentElement.innerHTML = '';
  }

  update(data) {
    this.data = data;
    const newMarkup = this.generateMarkUp();

    const newDOM = document.createRange().createContextualFragment(newMarkup);
    const newElements = Array.from(newDOM.querySelectorAll('*'));
    const curElements = Array.from(this.parentElement.querySelectorAll('*'));

    newElements.forEach((newEl, i) => {
      const curEl = curElements[i];
      // console.log(curEl, newEl.isEqualNode(curEl));

      // Updates changed TEXT
      if (
        !newEl.isEqualNode(curEl) &&
        newEl.firstChild?.nodeValue.trim() !== ''
      ) {
        curEl.textContent = newEl.textContent;
      }

      // Updates changed ATTRIBUES
      // to replace attributes in a current el. with new attr. from a new element
      if (!newEl.isEqualNode(curEl)) console.log(Array.from(newEl.attributes));
      Array.from(newEl.attributes).forEach(attr =>
        curEl.setAttribute(attr.name, attr.value)
      );
    });
  }
  renderSpinner() {
    let content = `
  <div class="spinner">
    <svg>
      <use href="${icons}#icon-loader"></use>
    </svg>
  </div>
  
    `;
    this.parentElement.insertAdjacentHTML('afterbegin', content);
  }
  renderError(message = this.errorMessage) {
    let markUp = `
    <div class="error">
    <div>
      <svg>
        <use href="${icons}#icon-alert-triangle"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div> -->`;
    this.clear();
    this.parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
  renderMessage(message = this.message) {
    let markUp = `
    <div class="message">
    <div>
      <svg>
        <use href="${icons}#icon-smile"></use>
      </svg>
    </div>
    <p>${message}</p>
  </div> -->`;
    this.clear();
    console.log(this.parentElement);
    this.parentElement.insertAdjacentHTML('afterbegin', markUp);
  }
}
