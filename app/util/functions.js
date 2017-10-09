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

export { getCamelSentence };
