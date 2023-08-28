import {
  newsListRequest,
  titleWrapperRequest,
  newsRequest,
  newsListTop,
  titleWrapperTop,
  formSearch,
  choiceCountry,
} from './getElements.js';

import preload from './preload.js';
import fetchRequest from './fetchRequest.js';
import renderNews from './renderNews.js';
import {updateTitleRequest, showImage} from './common.js';

let isLoading = false;

const searchNewsControl = () => {
  formSearch.addEventListener('submit', async (e) => {
    e.preventDefault();
  
    if (isLoading) {
      return;
    }
  
    const selectedValue = choiceCountry.value;
    const query = formSearch.search.value;
  
    if (!query || !selectedValue) return;
  
    const pageSizeTop = 4;
    const pageSizeSearch = 8;
  
    newsListTop.innerHTML = '';
    newsListRequest.innerHTML = '';
    titleWrapperRequest.classList.add('visually-hidden');
    titleWrapperTop.classList.add('visually-hidden');
    preload.show();
  
    try {
      isLoading = true;
      const [searchNewsResponse, topNewsResponse] = await Promise.all([
        fetchRequest(`everything?q=${query}&pageSize=${pageSizeSearch}`, {
          callback: renderNews,
          headers: {
            'X-Api-Key': '1e783d3a90f24589ad164570592e8fc1',
          },
        }),
        fetchRequest(`top-headlines?country=${selectedValue}&pageSize=${pageSizeTop}`, {
          callback: renderNews,
          headers: {
            'X-Api-Key': '1e783d3a90f24589ad164570592e8fc1',
          },
        }),
      ]);
  
      const {
        fragment: searchNewsCards,
        images: searchImages,
      } = searchNewsResponse;
      const {
        fragment: topNewsCards,
        images: topImages,
      } = topNewsResponse;
  
      const allImages = [...topImages, ...searchImages];
      await showImage(allImages);
  
      preload.remove();
      const countSearchResults = searchNewsCards
        .querySelectorAll('.news__item').length;
      updateTitleRequest(countSearchResults, query);
  
      newsRequest.classList.remove('visually-hidden');
      titleWrapperRequest.classList.remove('visually-hidden');
      newsListRequest.append(searchNewsCards);
      titleWrapperTop.classList.remove('visually-hidden');
      newsListTop.append(topNewsCards);
    } catch (err) {
      console.error('Ошибка:', err);
    } finally {
      isLoading = false;
    }
  });
}

export default searchNewsControl;
