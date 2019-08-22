$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var firstCardDiv = null;
var secondCardDiv = null;
var firstCardCheckFront = null;
var secondCardCheckFront = null;
var matches = null;
var maxMatches = 9;

var cardClasses = [
  'css-logo',
  'css-logo',
  'docker-logo',
  'docker-logo',
  'github-logo',
  'github-logo',
  'html-logo',
  'html-logo',
  'js-logo',
  'js-logo',
  'mysql-logo',
  'mysql-logo',
  'node-logo',
  'node-logo',
  'php-logo',
  'php-logo',
  'react-logo',
  'react-logo'
];

function initializeApp() {
  // shuffleCardOrder();
  setCardFronts();
  addClickHandler();
}

// function shuffleCardOrder() {}

function setCardFronts() {
  for (var i = 1; i <= cardClasses.length; i++) {
    var cardID = '#card' + i;
    $(cardID).find('.front').addClass(cardClasses[i - 1]);
  }
}

function addClickHandler() {
  $('.card.back').click(handleCardClick);
}

function handleCardClick(event) {
  console.log(event);
  console.log(event.currentTarget);

  var targetCard = $(event.currentTarget);
  if (targetCard.hasClass('back')) {
    targetCard.addClass('hidden');
  }

  if (!firstCardClicked) {
    firstCardDiv = $(event.currentTarget).parent();
    firstCardClicked = firstCardDiv.find('.front');
    firstCardCheckFront = firstCardClicked.css('background-image');
  } else {
    secondCardDiv = $(event.currentTarget).parent();
    secondCardClicked = secondCardDiv.find('.front');
    secondCardCheckFront = secondCardClicked.css('background-image');

    checkMatch(firstCardCheckFront, secondCardCheckFront);
    removeClickHandler();
    setTimeout(addClickHandler, 1500);
  }
}

function checkMatch(card1, card2) {
  if (card1 === card2) {
    console.log('cards match');
    matches++;
  } else {
    setTimeout(flipCardsBack, 1500);
  }
  resetClickedCards();
  checkWin();
}

function removeClickHandler() {
  $('.card').off('click');
}

function flipCardsBack() {
  firstCardDiv.find('.back').removeClass('hidden');
  secondCardDiv.find('.back').removeClass('hidden');
}

function resetClickedCards() {
  firstCardClicked = null;
  secondCardClicked = null;
}

function checkWin() {
  var winModal = $('#win_modal');
  if (matches === maxMatches) {
    winModal.removeClass('hidden');
  }
}
