const recipeContainer = document.querySelector('.recipe');
//  in parcel1n import icons from '../img/icons.svg';
// in parcel 2 for any static files not related to programming like images, videos etc we write url:
import * as model from './model.js';
import { recipeView } from './views/view.js';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import pagination from './views/pagination.js';
import View from './views/viewP.js';
import bookmarksView from './views/bookmarksView.js';
import addRecipeView from './views/addRecipeView.js';
import { closeWindow } from './config.js';
if (module.hot) {
  module.hot.accept();
}
async function showRecipe() {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();
    // update resultView to mark selected element
    resultsView.update(model.getSearchResultsPage());
    bookmarksView.update(model.state.bookmarks);

    // loading the recipe loadRecipe is an asynchronous function that returns promise that must be awaited.
    // this function does not return anything, only changes the state, so we do not store the result in any variable.
    await model.loadRecipe(id);
    // render recipe
    recipeView.render(model.state.recipe);
  } catch (er) {
    alert(er);
    recipeView.renderError();
  }
}
async function controlSearch() {
  try {
    resultsView.renderSpinner();
    const query = searchView.getQuery();
    if (!query) return;
    await model.loadSearchresult(query);
    // render results (model.state.search.page gets updateed to a new value and object madel.state.search becomes different and
    // we pass it in pagination render(model.state,search) )
    resultsView.render(model.getSearchResultsPage());
    // render page buttons
    pagination.render(model.state.search);

    // Render initial pagination buttons
  } catch (er) {
    console.log(er);
  }
}
function controlPagination(goToPage) {
  // to render new results
  resultsView.render(model.getSearchResultsPage(goToPage));
  // rende rnew page buttons becausethe page before has been changed
  pagination.render(model.state.search);
  console.log(goToPage);
}
function controlServings(newServings) {
  // Update recipe servings in a state
  model.updateServings(newServings);
  // Update the recipe view
  recipeView.update(model.state.recipe);
}
function controlBookmarks() {
  // Add or remove bookmarks
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else {
    model.deleteBookmark(model.state.recipe.id);
  }
  // Update recipeView
  recipeView.update(model.state.recipe);
  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
}
function bookmarksHandler() {
  bookmarksView.render(model.state.bookmarks);
}
async function controlAddRecipe(newRecipe) {
  try {
    await model.uploadRecipe(newRecipe);
    // render recipe
    recipeView.render(model.state.recipe);
    // display success message
    addRecipeView.renderMessage();
    // render bookmark view
    bookmarksView.render(model.state.bookmarks);
    bookmarksView.generateMarkUp();
    // addRecipeView.generateMarkUp();
    // change ID in URL
    // in pushState first argument is a state which is not important, title
    // the one, which is important is URL
    setTimeout(function () {
      addRecipeView.hideWindow();
      addRecipeView.generateMarkUp();
    }, 3000);
  } catch (er) {
    console.error('😭😭😭', er);
    addRecipeView.renderError(er.message);
  }
}
controlSearch();
function welcome() {
  alert('Welcome on our website 😋🍜🍵🍰');
}
function init() {
  bookmarksView.addHandlerRender(bookmarksHandler);
  searchView.addHandler(controlSearch);
  recipeView.addHandlerFunction(showRecipe);
  recipeView.addHandlerBookmark(controlBookmarks);
  pagination.addHandler(controlPagination);
  recipeView.addHandlerServings(controlServings);
  addRecipeView.addHandlerUpload(controlAddRecipe);
  addRecipeView.setHandlerUpload(controlAddRecipe);
  welcome();
}
init();
// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////
