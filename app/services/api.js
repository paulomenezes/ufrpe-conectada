import { AVA_URL, FIREBASE_URL, CONSTS, headers } from '../contants';

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

const getCourseContent = courseId => {
  const formData = new FormData();
  formData.append('wstoken', global.USER.token);
  formData.append('courseid', courseId);
  formData.append('wsfunction', CONSTS.FUNCTION_GET_COURSE_CONTENTS);

  return fetch(AVA_URL + CONSTS.URL_COMPLEMENT, {
    method: 'POST',
    body: formData,
    headers
  }).then(response => response.json());
};

const getSemester = () => {
  return fetch(FIREBASE_URL + 'currentSemester.json').then(response => response.text());
};

const getSchedules = () => {
  return fetch(FIREBASE_URL + 'schedules.json').then(response => response.json());
};

const getCalendar = () => {
  return fetch(FIREBASE_URL + 'calendar.json').then(response => response.json());
};

const getCalendarEvents = (timeStart, timeEnd, courseId) => {
  const formData = new FormData();

  formData.append('options[userevents]', 1);
  formData.append('options[siteevents]', 1);
  formData.append('options[timestart]', timeStart);
  formData.append('options[timeend]', timeEnd);
  courseId.forEach(id => {
    formData.append('events[courseids][]', id);
  });
  formData.append('wsfunction', CONSTS.FUNCTION_GET_CALENDAR_EVENTS);
  formData.append('wstoken', global.USER.token);

  return fetch(AVA_URL + CONSTS.URL_COMPLEMENT, {
    method: 'POST',
    body: formData,
    headers
  }).then(response => response.json());
};

const getMessages = (userIdTo, userIdFrom) => {
  const formData = new FormData();

  formData.append('useridto', userIdTo);
  formData.append('useridfrom', userIdFrom);
  formData.append('limitfrom', 0);
  formData.append('limitnum', 100);
  formData.append('read', 1);
  formData.append('type', 'conversations');
  formData.append('newestfirst', 1);
  formData.append('wsfunction', CONSTS.FUNCTION_GET_MESSAGES);
  formData.append('wstoken', global.USER.token);

  return fetch(AVA_URL + CONSTS.URL_COMPLEMENT, {
    method: 'POST',
    body: formData,
    headers
  }).then(response => response.json());
};

export {
  login,
  getSiteInfo,
  getUserById,
  getUsersCourses,
  getSemester,
  getSchedules,
  getCalendar,
  getCourseContent,
  getCalendarEvents,
  getMessages
};
