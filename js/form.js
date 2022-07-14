import { isEscapeKey } from './util.js';

const userModalElement = document.querySelector('.img-upload__overlay');
const userModalCloseElement = document.querySelector('.img-upload__cancel');
const userUploadFile = document.querySelector('#upload-file');
const form = document.querySelector('.img-upload__form');
const inputs = form.querySelectorAll('input, textarea');
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


form.querySelector('.img-upload__effect-level').style.display = 'none';

effectCollection.onclick = function (evt) {
  if (evt.target.nodeName === 'SPAN') {
    imgNode.classList.forEach((item) => {
      if(item !== 'img-upload__preview') {imgNode.classList.remove(item);
      }
    });
    imgNode.classList.add(evt.target.classList[1]);
  }
};

smallerBtnNode.onclick = function () {
  let val = Number(inputScaleNode.value.match(re));
  val = (val - STEP_SIZE_IMG === 0) ? STEP_SIZE_IMG : val - STEP_SIZE_IMG;
  inputScaleNode.value = `${val  }%`;
  imgNode.style.transform = `scale(${val/RATIO})`;
};

biggerBtnNode.onclick = function () {
  let val = Number(inputScaleNode.value.match(re));
  val = (val + STEP_SIZE_IMG > MAX_SIZE_IMG) ? MAX_SIZE_IMG : val + STEP_SIZE_IMG;
  inputScaleNode.value = `${val  }%`;
  imgNode.style.transform = `scale(${val/RATIO})`;
};


const pristine = new Pristine(form, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
});


form.addEventListener('keypress', () => {
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
    closeEditImageForm();
  }
};

function openEditImageForm() {
  sendBtn.disabled = true;
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

