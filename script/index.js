import {choices} from './choice.js';
import fetchRequest from './fetchRequest.js';
import renderNews from './renderNews.js';
import preload from './preload.js';
import {showImage} from './common.js';
import {newsListTop} from './getElements.js';
import searchNewsControl from './searchNews.js';

const initTopNews = async (pageSize) => {
  const postfix = `top-headlines?country=ru&pageSize=${pageSize}`;

  const {fragment, images} = await fetchRequest(postfix, {
    callback: renderNews,
    headers: {
      'X-Api-Key': '1e783d3a90f24589ad164570592e8fc1',
    },
  });

  return {cards: fragment, images};
};

const init = async () => {
  choices();
  preload.show();

  try {
    const {cards, images} = await initTopNews(8);
    await showImage(images);

    preload.remove();
    newsListTop.append(cards);
  } catch (err) {
    console.error('Ошибка:', err);
  }

  searchNewsControl();
};

init();
