import moment from 'moment';

const getCamelSentence = (sentence, first) => {
  if (first) {
    return sentence.substring(0, 1).toUpperCase() + sentence.substring(1).toLowerCase();
  } else {
    const words = sentence.split(' ');
    let result = '';

    words.forEach(word => {
      result += word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase() + ' ';
    });

    return result;
  }
};

const dateToString = date => {
  return moment(date).format('YYYY-MM-DD');
  //console.log(date, date.toISOString());
  //return date.toISOString().substr(0, 10); // `${date.getFullYear()}-${date.getMonth()}-${date.getDate()}`;
};

export { getCamelSentence, dateToString };
