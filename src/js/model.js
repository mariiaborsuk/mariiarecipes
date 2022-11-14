// import { async } from 'generator-runtime';
import { API_URL, key } from './config';
import { AJAX } from './helper';
import { perPage } from './config';

export const state = {
  recipe: {},
  search: {
    query: '',
    results: [],
    resultsPerPage: perPage,
    page: 1,
  },
  // bookmarked recipes will be pushed into an array
  bookmarks: [],
};
function createRecipeData(data) {
  let { recipe } = data.data;
  console.log(data);

  //to format recipe object:
  return {
    id: recipe.id,
    title: recipe.title,
    publisher: recipe.publisher,
    sourceUrl: recipe.source_url,
    image: recipe.image_url,
    servings: recipe.servings,
    cookingTime: recipe.cooking_time,
    ingredients: recipe.ingredients,
    // not all the recipes have keys. we add it only if the recipe has it
    // if recipe.key is falsy value nothing happens
    // If there is a value, then the second part is executed and the object is return. we spread the object
    ...(recipe.key && { key: recipe.key }),
  };
}
export async function loadRecipe(id) {
  let data = await AJAX(`${API_URL}/${id}`);
  state.recipe = createRecipeData(data);
  // to check if there is any bookmark with the id equal to id we have just received from`${API_URL}/${id}`
  // when we load recipes the bookmarks already will be eithe rtrue or false
  if (state.bookmarks.some(b => b.id === id)) {
    state.recipe.bookmarked = true;
  } else {
    state.recipe.bookmarked = false;
  }
}
export async function loadSearchresult(query) {
  try {
    state.search.query = query;
    let data = await AJAX(`${API_URL}/?search=${query}`);
    console.log(data);
    state.search.results = data.data.recipes.map(res => {
      return {
        id: res.id,
        title: res.title,
        publisher: res.publisher,
        image: res.image_url,
      };
    });
    state.search.page = 1;
  } catch (er) {
    throw er;
  }
}
export function getSearchResultsPage(page = state.search.page) {
  // we need know on which page we are to implement pagination
  state.search.page = page;
  let start = (page - 1) * state.search.resultsPerPage;
  let end = page * state.search.resultsPerPage;

  return state.search.results.slice(start, end);
}
// function will reach into the state and recipe ingredients and change the quantity in each ingredients
export function updateServings(newServings) {
  state.recipe.ingredients.forEach(ing => {
    ing.quantity = (ing.quantity * newServings) / state.recipe.servings;
  });
  state.recipe.servings = newServings;
}
function persistBook() {
  localStorage.setItem('bookmarks', JSON.stringify(state.bookmarks));
}
export function addBookmark(recipe) {
  //Add recipe to bookmark
  state.bookmarks.push(recipe);
  // mark current recipe as bookmark
  if (recipe.id === state.recipe.id) state.recipe.bookmarked = true;
  persistBook();
}
export function deleteBookmark(id) {
  let index = state.bookmarks.findIndex(el => el.id === id);
  state.bookmarks.splice(index, 1);
  // mark current recipe as NOT bookmark
  if (id === state.recipe.id) state.recipe.bookmarked = false;
  persistBook();
}
// to take the bookmark out of the storage
function init() {
  const storage = localStorage.getItem('bookmarks');
  //  if there is smth in the storage, we convert it back to an object
  if (storage) state.bookmarks = JSON.parse(storage);
}
export const uploadRecipe = async function (newRecipe) {
  try {
    const ingredients = Object.entries(newRecipe)
      .filter(entry => entry[0].startsWith('ingredient') && entry[1] !== '')
      .map(ing => {
        const ingArr = ing[1].split(',').map(el => el.trim());
        // const ingArr = ing[1].replaceAll(' ', '').split(',');
        if (ingArr.length !== 3)
          throw new Error(
            'Wrong ingredient fromat! Please use the correct format :)'
          );

        const [quantity, unit, description] = ingArr;

        return { quantity: quantity ? +quantity : null, unit, description };
      });
    const recipe = {
      title: newRecipe.title,
      source_url: newRecipe.sourceUrl,
      image_url: newRecipe.image,
      publisher: newRecipe.publisher,
      cooking_time: +newRecipe.cookingTime,
      servings: +newRecipe.servings,
      ingredients,
    };
    console.log(recipe);
    let data = await AJAX(`${API_URL}?key=${key}`, recipe);
    state.recipe = createRecipeData(data);
    console.log(state);
    addBookmark(state.recipe);
  } catch (er) {
    throw er;
  }
};
console.log(BUG);
}

init();
