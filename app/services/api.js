import { AVA_URL, CONSTS, headers } from '../contants';

const login = (username, password) => {
  const formData = new FormData();
  formData.append('username', username);
  formData.append('password', password);
  formData.append('service', CONSTS.LOGIN_SERVICE);

  return fetch(AVA_URL + '/login/token.php', {
    method: 'POST',
    body: formData,
    headers
  }).then(response => response.json());
};

const getSiteInfo = token => {
  const formData = new FormData();
  formData.append('wstoken', token);
  formData.append('wsfunction', CONSTS.FUNCTION_GET_SITE_INFO);

  return fetch(AVA_URL + CONSTS.URL_COMPLEMENT, {
    method: 'POST',
    body: formData,
    headers
  }).then(response => response.json());
};

const getUserById = (userId, token) => {
  const formData = new FormData();
  formData.append('wstoken', token);
  formData.append('userids[0]', userId);
  formData.append('wsfunction', CONSTS.FUNCTION_GET_USER);

  return fetch(AVA_URL + CONSTS.URL_COMPLEMENT, {
    method: 'POST',
    body: formData,
    headers
  }).then(response => response.json());
};

const getUsersCourses = (userId, token) => {
  const formData = new FormData();
  formData.append('wstoken', token);
  formData.append('userid', userId);
  formData.append('wsfunction', CONSTS.FUNCTION_GET_USER_COURSES);

  return fetch(AVA_URL + CONSTS.URL_COMPLEMENT, {
    method: 'POST',
    body: formData,
    headers
  }).then(response => response.json());
};

export { login, getSiteInfo, getUserById, getUsersCourses };