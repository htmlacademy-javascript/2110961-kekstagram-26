import {createFotos} from './data.js';

const photoListElement = document.querySelector('.pictures');

const randomPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');

const similarFotos = createFotos();

const randomPhotoFragment = document.createDocumentFragment();

similarFotos.forEach(({url, likes, comments}) => {
  const photoElement = randomPictureTemplate.cloneNode(true);
  photoElement.querySelector('.picture__img').src = url;
  photoElement.querySelector('.picture__likes').textContent = likes;
  photoElement.querySelector('.picture__comments').textContent = comments.length;
  randomPhotoFragment.appendChild(photoElement);
});

photoListElement.appendChild(randomPhotoFragment);

