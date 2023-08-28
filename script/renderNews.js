import {setDefaultImage} from './common.js';

const urlPattern = /^(http|https):\/\//;

const renderNews = (err, data) => {
  if (err) {
    console.warn(err, data);
    return;
  }

  const fragment = document.createDocumentFragment();
  const images = [];

  const news = data.map(item => {
    const card = document.createElement('li');
    card.classList.add('news__item');

    const image = new Image();
    image.classList.add('news__image');

    if (item.urlToImage && urlPattern.test(item.urlToImage)) {
      image.src = item.urlToImage;
      image.alt = item.title;
    } else {
      setDefaultImage(image);
    }

    images.push(image);

    card.innerHTML = `
      <h3 class="news__title">
        <a href="${item.url}" class="news__link" target="_blank">
          ${item.title}
        </a>
      </h3>
      ${item.description ?
        `<p class="news__description">${item.description}</p>` : ''}
      <div class="news__footer">
        <time class="news__datetime" datetime="${item.publishedAt}">
          <span class="news__date">
            ${item.publishedAt.substring(8, 10)}/
            ${item.publishedAt.substring(5, 7)}/
            ${item.publishedAt.substring(0, 4)}
          </span> ${item.publishedAt.substring(11, 16)}
        </time>
        ${item.author ? `<p class="news__author">${item.author}</p>` : ''}
      </div>
    `;
    card.prepend(image);
    return card;
  });

  fragment.append(...news);
  console.log(images);
  return {fragment, images};
};

export default renderNews;
