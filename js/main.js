import { renderSimilarFotos } from './template.js';
import { showAlert } from './form.js';


fetch('https://26.javascript.pages.academy/kekstagram/data/')
  .then((response) => {
    if (response.ok) {
      return response;
    }
    throw new Error(`${response.status} — ${response.statusText}`);
  })
  .then((response) => response.json())
  .then((getPhotoCards) => {
    renderSimilarFotos(getPhotoCards);
  })
  .catch(() => showAlert('Не удалось загрузить изображения'));
