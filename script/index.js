import {choices} from './choice.js';
import fetchRequest from './fetchRequest.js';
import renderNews from './renderNews.js';
import preload from './preload.js';

import {
  showImage,
  clearNewsLists,
} from './common.js';

import {
  newsListTop,
  choiceCountry,
  titleWrapperRequest,
  newsRequest,
} from './getElements.js';
import {searchNewsControl} from './searchNews.js';

const initTopNews = async (pageSize, selectedValue) => {
  const postfix = `top-headlines?country=${selectedValue}&pageSize=${pageSize}`;

  const {fragment, images} = await fetchRequest(postfix, {
    callback: renderNews,
    headers: {
      'X-Api-Key': '1e783d3a90f24589ad164570592e8fc1',
    },
  });

  return {cards: fragment, images};
};

const updateNews = async () => {
  try {
    clearNewsLists();
    titleWrapperRequest.classList.add('visually-hidden');
    newsRequest.classList.add('visually-hidden');
    preload.show();

    const selectedValue = choiceCountry.value;

    const {cards, images} = await initTopNews(8, selectedValue);
    await showImage(images);

    preload.remove();
    newsListTop.append(cards);
  } catch (err) {
    console.error('Ошибка:', err);
  }
};

const init = async () => {
  choices();
  preload.show();

  try {
    const {cards, images} = await initTopNews(8, 'ru');
    await showImage(images);

    preload.remove();
    newsListTop.append(cards);
  } catch (err) {
    console.error('Ошибка:', err);
  }

  choiceCountry.addEventListener('change', updateNews);
  searchNewsControl();
};

init();
