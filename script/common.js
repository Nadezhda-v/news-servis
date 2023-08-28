import {
  titleRequest,
} from './getElements.js';

const setDefaultImage = (img) => {
  img.src = 'img/not-found-image.jpg';
  img.alt = 'default Image';
};

const showImage = async (images) => Promise.all(
  images.map(image =>
    new Promise((resolve) => {
      if (image.complete) {
        resolve(image);
      } else {
        image.addEventListener('load', () => {
          resolve(image);
        });

        image.addEventListener('error', () => {
          console.warn('Изображение не удалось загрузить:', image.src);
          setDefaultImage(image);
        });
      }
    }),
  ),
);

const getResultWithNumber = (number) => {
  const lastDigit = number % 10;
  const lastTwoDigits = number % 100;

  if (lastTwoDigits >= 11 && lastTwoDigits <= 19) {
    return `${number} результатов`;
  }

  if (lastDigit === 1) {
    return `${number} результат`;
  }

  if (lastDigit >= 2 && lastDigit <= 4) {
    return `${number} результата`;
  }

  return `${number} результатов`;
};

const updateTitleRequest = (countSearchResults, query) => {
  const countResults = getResultWithNumber(countSearchResults);
  const titleText = countSearchResults === 0 ?
    `По вашему запросу "${query}" не найдено результатов` :
    `По вашему запросу "${query}" найдено "${countResults}"`;

  titleRequest.textContent = titleText;
};

export {
  setDefaultImage,
  showImage,
  updateTitleRequest,
  getResultWithNumber,
};
