const photoListElement = document.querySelector('.pictures');
const randomPictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const randomPhotoFragment = document.createDocumentFragment();

const renderSimilarFotos = (similarFotos) => {
  similarFotos.forEach(({url, likes, comments }) => {
    const photoElement = randomPictureTemplate.cloneNode(true);
    photoElement.querySelector('.picture__img').src = url;
    photoElement.querySelector('.picture__likes').textContent = likes;
    photoElement.querySelector('.picture__comments').textContent = comments.length;
    randomPhotoFragment.appendChild(photoElement);
  });
  photoListElement.appendChild(randomPhotoFragment);
};


export { renderSimilarFotos };
