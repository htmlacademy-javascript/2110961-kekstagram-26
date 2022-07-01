import {isEscapeKey} from './util.js';

const userModalElement = document.querySelector('.img-upload__overlay');
const userModalCloseElement = document.querySelector('.img-upload__cancel');
const userUploadFile = document.querySelector('#upload-file');
const form = document.querySelector('.img-upload__form');
const inputs = form.querySelectorAll('input, textarea');
const sendBtn = form.querySelector('.img-upload__submit');


const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});


form.addEventListener('keypress', () => {
  //evt.preventDefault();

  const isValid = pristine.validate();
  if (isValid) {
    sendBtn.disabled = false;
  } else {
    sendBtn.disabled = true;
  }
});

const clearInputValue = () => {
  // eslint-disable-next-line no-return-assign
  inputs.forEach((input) => input.value = '');
};


const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeEditImageForm ();
  }
};

function openEditImageForm () {
  sendBtn.disabled = true;
  userModalElement.classList.remove('hidden');
  document.body.classList.add('modal-open');
  document.addEventListener('keydown', onPopupEscKeydown);
}

function closeEditImageForm () {
  userModalElement.classList.add('hidden');
  document.body.classList.remove('modal-open');
  clearInputValue();
  document.removeEventListener('keydown', onPopupEscKeydown);
}

const onFileSelect = () => {
  openEditImageForm ();
};

userModalCloseElement.onclick = () => {
  closeEditImageForm ();
};

userUploadFile.addEventListener('change', onFileSelect);

