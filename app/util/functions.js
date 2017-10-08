const getCamelSentence = sentence => {
  const words = sentence.split(' ');
  let result = '';

  words.forEach(word => {
    result += word.substring(0, 1).toUpperCase() + word.substring(1).toLowerCase() + ' ';
  });

  return result;
};

export { getCamelSentence };
