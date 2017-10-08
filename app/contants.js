export const months = [
  'Janeiro',
  'Fevereiro',
  'Março',
  'Abril',
  'Maio',
  'Junho',
  'Julho',
  'Agosto',
  'Setembro',
  'Outubro',
  'Novembro',
  'Dezembro'
];
export const weekDays = ['Domingo', 'Segunda', 'Terca', 'Quarta', 'Quinta', 'Sexta', 'Sabado'];
export const meals = {
  principal: 'Principal',
  grelha: 'Na Grelha',
  vegetariano: 'Vegetariano',
  fastgrill: 'Fast Grill',
  acompanhamento: 'Acompanhamento',
  sopa: 'Sopa',
  salada: 'Salada',
  sobremesa: 'Sobremesa',
  suco: 'Suco'
};

export const AVA_URL = 'http://ava.ufrpe.br';
export const FIREBASE_URL = 'https://ufrpe-5033f.firebaseio.com/';
export const CONSTS = {
  URL_COMPLEMENT: '/webservice/rest/server.php?moodlewsrestformat=json',
  LOGIN_SERVICE: 'moodle_mobile_app',
  FUNCTION_GET_USER: 'core_user_get_users_by_id',
  FUNCTION_GET_USER_COURSES: 'core_enrol_get_users_courses',
  FUNCTION_GET_SITE_INFO: 'core_webservice_get_site_info',
  FUNCTION_GET_COURSE_CONTENTS: 'core_course_get_contents',
  FUNCTION_GET_CALENDAR_EVENTS: 'core_calendar_get_calendar_events',
  FUNCTION_GET_MESSAGES: 'core_message_get_messages',
  FUNCTION_SEND_MESSAGE: 'core_message_send_instant_messages',
  FUNCTION_GET_PARTICIPANTS: 'core_enrol_get_enrolled_users',
  FUNCTION_GET_ASSIGNMENTS: 'mod_assign_get_assignments',
  FUNCTION_GET_DISCUSSIONS: 'mod_forum_get_forum_discussions_paginated',
  FUNCTION_GET_DISCUSSIONS_POSTS: 'mod_forum_get_forum_discussion_posts',
  FUNCTION_GET_GRADES: 'gradereport_user_get_grades_table'
};

export const headers = {
  Accept: 'application/json',
  'Content-Type': 'multipart/form-data'
};

export const SEMESTER = '2017.2';
