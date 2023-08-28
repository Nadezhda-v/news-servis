export const choices = () => {
  const choicesElem = document.querySelector('.js-choice');

  const choises = new Choices(choicesElem, {
    searchEnabled: false,
    shouldSort: false,
    itemSelectText: '',
    classNames: {
      containerInner: 'choices__inner choices-box',
    },
  });

  return choises;
};
