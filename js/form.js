import { isEscapeKey } from './util.js';
import { sendData } from './api.js';

const userModalElement = document.querySelector('.img-upload__overlay');
const userModalCloseElement = document.querySelector('.img-upload__cancel');
const userUploadFile = document.querySelector('#upload-file');
const body = document.body;
const form = document.querySelector('.img-upload__form');
const sendBtn = form.querySelector('.img-upload__submit');
const smallerBtnNode = form.querySelector('.scale__control--smaller');
const biggerBtnNode = form.querySelector('.scale__control--bigger');
const inputScaleNode = form.querySelector('.scale__control--value');
const re = /[0-9]+/;
const imgNode = form.querySelector('div.img-upload__preview img');
const effectCollection = form.querySelector('.effects__list');
const STEP_SIZE_IMG = 25;
const RATIO = 100;
const MAX_SIZE_IMG = 100;
const ALERT_SHOW_TIME = 5000;
const TXT_CANT_SEND_FORM = 'Не удалось отправить форму. Попробуйте ещё раз';
const TXT_FORM_INCORRECT = 'Неправильно введены данные';

const messageSuccessTemplate = document.querySelector('#success')
  .content
  .querySelector('.success');
const messageErrorTemplate = document.querySelector('#error')
  .content
  .querySelector('.error');


const messageSuccess = messageSuccessTemplate.cloneNode(true);
const messageError = messageErrorTemplate.cloneNode(true);


form.querySelector('.img-upload__effect-level').style.display = 'none';


const sendResult = (result) => {
  const closePopup = (res) => {
    const sectionNode = document.querySelector(`.${res}`);
    sectionNode.remove();
    userModalElement.classList.remove('hidden');
    if (res === 'error') { userUploadFile.click(); }
    else { closeEditImageForm(); }
  };
  sendBtn.disabled = false;
  userModalElement.classList.add('hidden');
  body.appendChild(result === 'error' ? messageError : messageSuccess);
  const onPopupMessageEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      evt.stopPropagation();
      document.removeEventListener('keydown', onPopupMessageEscKeydown);
      closePopup(result);
    }
  };
  document.addEventListener('keydown', onPopupMessageEscKeydown);
  const button = document.querySelector(`.${result}__button`);
  const section = document.querySelector(`.${result}`);
  section.onclick = (evt) => {
    if (evt.target === section || evt.target === button) {
      closePopup(result);
    }
  };
};


effectCollection.onclick = function (evt) {
  if (evt.target.nodeName === 'SPAN') {
    imgNode.classList.forEach((item) => {
      if (item !== 'img-upload__preview') {
        imgNode.classList.remove(item);
      }
    });
    imgNode.classList.add(evt.target.classList[1]);
  }
};


smallerBtnNode.onclick = function () {
  let val = Number(inputScaleNode.value.match(re));
  val = (val - STEP_SIZE_IMG === 0) ? STEP_SIZE_IMG : val - STEP_SIZE_IMG;
  inputScaleNode.value = `${val}%`;
  imgNode.style.transform = `scale(${val / RATIO})`;
};

biggerBtnNode.onclick = function () {
  let val = Number(inputScaleNode.value.match(re));
  val = (val + STEP_SIZE_IMG > MAX_SIZE_IMG) ? MAX_SIZE_IMG : val + STEP_SIZE_IMG;
  inputScaleNode.value = `${val}%`;
  imgNode.style.transform = `scale(${val / RATIO})`;
};


const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});

const formValidate = () => {
  const isValid = pristine.validate();
  if (isValid) {
    sendBtn.disabled = false;
    return true;
  } else {
    sendBtn.disabled = true;
    return false;
  }
};

form.addEventListener('keypress', formValidate);

const clearInputValue = () => {
  form.querySelector('input.scale__control').value = '100%';
  imgNode.style.transform = 'scale(100%)';

  form.querySelector('input.effects__radio').value = 'none';
  form.querySelector('input.effects__radio[value=none]').checked = true;
  imgNode.classList.forEach((item) => {
    if (item !== 'img-upload__preview') {
      imgNode.classList.remove(item);
    }
  });
  imgNode.classList.add('none');

  form.querySelector('input.text__hashtags').value = '';
  form.querySelector('textarea.text__description').value = '';
  form.querySelector('input.img-upload__input').value = '';
};


const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeEditImageForm();
  }
};

function openEditImageForm() {
  userModalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
}

function closeEditImageForm() {
  userModalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  clearInputValue();
  document.removeEventListener('keydown', onPopupEscKeydown);
}

const onFileSelect = () => {
  openEditImageForm();
};

userModalCloseElement.onclick = () => {
  closeEditImageForm();
};

userUploadFile.addEventListener('change', onFileSelect);

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const sendFail = () => {
  sendBtn.disabled = false;
  showAlert(TXT_CANT_SEND_FORM);
};

const setUserFormSubmit = () => {
  form.addEventListener('submit', (evt) => {
    evt.preventDefault();
    if (formValidate()) {
      sendBtn.disabled = true;
      sendData(
        sendResult,
        sendFail,
        new FormData(form),
      );
    } else {
      showAlert(TXT_FORM_INCORRECT);
      sendBtn.disabled = false;
    }
  });
};

export { showAlert, setUserFormSubmit, sendResult};
