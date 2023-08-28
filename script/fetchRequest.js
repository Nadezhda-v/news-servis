const URL = 'https://newsapi.org/v2/';

const fetchRequest = async (postfix, {
  method = 'GET',
  callback,
  body,
  headers,
}) => {
  try {
    const options = {
      method,
    };

    if (body) options.body = JSON.stringify(body);
    if (headers) options.headers = headers;

    const response = await fetch(`${URL}${postfix}`, options);
    if (response.ok) {
      const data = await response.json();
      if (callback) {
        const news = callback(null, data.articles);
        return news;
      }

      return data.articles;
    }

    throw new Error(`Ошибка ${response.status}: ${response.statusText}`);
  } catch (err) {
    if (callback) callback(err);
  }
};

export default fetchRequest;
