import { renderSimilarFotos } from './template.js';
import { getData } from './api.js';
import { setUserFormSubmit } from './form.js';

getData ((getPhotoCards) => {
  renderSimilarFotos(getPhotoCards);
});

setUserFormSubmit();
