import { PORAQUI_URL, headers } from '../contants';

const getNews = page => {
  if (page === undefined) {
    page = 0;
  }

  console.log(PORAQUI_URL + 'stationIds=19&page=' + page);

  return fetch(PORAQUI_URL + 'stationIds=19&page=' + page).then(response => response.json());
};

export { getNews };
