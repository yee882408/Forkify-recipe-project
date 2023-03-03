import * as model from './model';
import recipeView from './views/recipeView';
import searchView from './views/searchView';
import resultView from './views/resultView';
import bookmarksView from './views/bookmarksView';
import paginationView from './views/paginationView';
import addRecipeView from './views/addRecipeView';
import { MODEL_CLOSE_SEC } from './config';

import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { async } from 'regenerator-runtime';

const controlRecipe = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;

    recipeView.renderSpinner();
    // 0)) Update results view to mark selected search result
    resultView.update(model.getPageSearchResults());
    // 1)) Updating bookmarks view
    bookmarksView.update(model.state.bookmarks);

    // 2)) Loading recipe
    await model.loadRecipe(id);

    // 3)) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderErr();
  }
};

const controlSearchResults = async function () {
  try {
    resultView.renderSpinner();

    // 1)) Get search query
    const query = searchView.getQuery();
    if (!query) return;

    // 2)) load search query
    await model.loadSearchResults(query);

    // 3)) Render results
    // resultView.render(model.state.search.results);
    resultView.render(model.getPageSearchResults());

    // 4)) Render pagination btn
    paginationView.render(model.state.search);
  } catch (err) {
    console.log(err);
  }
};

const controlPagination = function (goToPage) {
  // 1)) Render results
  resultView.render(model.getPageSearchResults(goToPage));

  // 2)) Render pagination btn
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings
  model.updateServings(newServings);

  // Rendering recipe
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  // Add/ remove bookmark
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  else model.deleteBookmark(model.state.recipe.id);
  // Update recipe view
  recipeView.update(model.state.recipe);

  // Render bookmarks
  bookmarksView.render(model.state.bookmarks);
};

const cortrolBookmarks = function () {
  bookmarksView.render(model.state.bookmarks);
};

const controlUploadRecipe = async function (newRecipe) {
  try {
    // Show loading spinner
    addRecipeView.renderSpinner();

    // Upload the new recipe
    await model.uploadRecipe(newRecipe);
    console.log(model.state.recipe);

    // Render recipe
    recipeView.render(model.state.recipe);

    // Success message
    addRecipeView.renderMsg();

    // Render bookmark view
    bookmarksView.render(model.state.bookmarks);

    // Change ID in url
    window.history.pushState(null, '', `#${model.state.recipe.id}`);

    // Close form window
    setTimeout(function () {
      addRecipeView.toggleWindow();
    }, MODEL_CLOSE_SEC * 1000);
  } catch (err) {
    console.error(err);
    addRecipeView.renderErr(err.message);
  }
  model.uploadRecipe(newRecipe);
  setTimeout(location.reload(), MODEL_CLOSE_SEC * 2000);
};

const init = function () {
  bookmarksView.addHandlerRender(cortrolBookmarks);
  recipeView.addHandler(controlRecipe);
  recipeView.addHandlerServings(controlServings);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  searchView.addHandler(controlSearchResults);
  paginationView.addHandlder(controlPagination);
  addRecipeView.addHandlerUpload(controlUploadRecipe);
};
init();
