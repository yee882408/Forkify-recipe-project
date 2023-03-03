import previewView from './previewView';

import icons from 'url:../../img/icons.svg';
import View from './View';

class ResultView extends View {
  _parentElement = document.querySelector('.results');
  _errMsg = '找不到該食譜，請在試一次!';
  _message = '';

  //  When preview is sibling with resultview and bookmarkview can use this>>
  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join(); // =this._data.map(dataResult => this._generateMarkupPreview(dataResult))
  }
}

export default new ResultView();
