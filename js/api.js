import { showAlert} from './form.js';

const URL_POST ='https://26.javascript.pages.academy/kekstagram/';
const URL_GET_FOTO_CARDS = 'https://26.javascript.pages.academy/kekstagram/data/';
const TXT_FORM_UPLOAD_ERROR = 'Не удалось загрузить изображения';


const getData = (renderSimilarFotos) => {
  fetch(URL_GET_FOTO_CARDS)
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
    .catch(() => showAlert(TXT_FORM_UPLOAD_ERROR));
};

const sendData = (sendResult, sendFail, body) => {
  fetch(
    URL_POST,
    {
      method: 'POST',
      body,
    },
  )
    .then((response) => {
      if (response.ok) {
        sendResult('success');
      } else {
        sendResult('error');
      }
    })
    .catch(() => {
      sendFail();
    });
};


export { getData, sendData };
