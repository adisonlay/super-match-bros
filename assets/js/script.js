$(document).ready(initializeApp);

function initializeApp() {
  $('.card').click(handleCardClick);
}

function handleCardClick(event) {
  console.log(event.currentTarget);
  $(event.currentTarget).toggleClass('hidden');
}
