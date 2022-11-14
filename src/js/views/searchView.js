class SearchView {
  parentEl = document.querySelector('.search');
  getQuery() {
    let query = this.parentEl.querySelector('.search__field').value;
    this.clearInput();
    return query;
  }
  clearInput() {
    this.parentEl.querySelector('.search__field').value = '';
  }
  addHandler(handler) {
    // 'submit' event will work no matter whether user pressed submit button or hit enter
    // we cannot add hanlder directly becaus esubmitting a form we need to prevent default actions or the page will reload
    this.parentEl.addEventListener('submit', function (e) {
      e.preventDefault();
      handler();
    });
  }
}
export default new SearchView();
