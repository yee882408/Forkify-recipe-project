import View from './View';
import previewView from './previewView';
import icons from 'url:../../img/icons.svg';

class BookmarskView extends View {
  _parentElement = document.querySelector('.bookmarks__list');
  _errMsg = '請找到喜歡的食譜並加入書籤!!';
  _message = '';

  addHandlerRender(handler) {
    window.addEventListener('load', handler);
  }

  // When preview is sibling with resultview and bookmarkview can use this>>
  _generateMarkup() {
    return this._data
      .map(bookmark => previewView.render(bookmark, false))
      .join(); // =this._data.map(dataResult => this._generateMarkupPreview(dataResult))
  }
}

export default new BookmarskView();
