$(document).ready(initializeApp);

var firstCardClicked = null;
var secondCardClicked = null;
var firstCardDiv = null;
var secondCardDiv = null;
var firstCardCheckFront = null;
var secondCardCheckFront = null;
var matches = null;
var maxMatches = 9;
var attempts = null;
var gamesPlayed = 0;

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
  shuffleCardOrder(cardClasses);
  setCardFronts();
  addClickHandler();
  backButtonHandler();
  playAgainButtonHandler();
}

function shuffleCardOrder(array) {
  var currentIndex = array.length;
  var tempValue = null;
  var randomIndex = null;

  while (currentIndex > 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    tempValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = tempValue;
  }
}

function setCardFronts() {
  for (var i = 1; i <= cardClasses.length; i++) {
    var cardID = '#card' + i;
    $(cardID).find('.front').removeClass('.css-logo docker-logo github-logo html-logo js-logo mysql-logo node-logo php-logo react-logo');
    $(cardID).find('.front').addClass(cardClasses[i - 1]);
  }
}

function addClickHandler() {
  $('.card.back').click(handleCardClick);
}

function handleCardClick(event) {
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
    setTimeout(addClickHandler, 1000);
  }
}

function checkMatch(card1, card2) {
  if (card1 === card2) {
    matches++;
  } else {
    setTimeout(flipCardsBack, 1000);
  }
  attempts++;
  resetClickedCards();
  checkWin();
  displayStats();
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
  if (matches === maxMatches) {
    $('#win_modal').removeClass('hidden');
    gamesPlayed++;
  }
}

function calculateAccuracy() {
  return matches / attempts;
}

function displayStats() {
  $('#games_played_count').text(gamesPlayed);
  $('#attempts_count').text(attempts);

  var currentAccuracy = Math.round(calculateAccuracy() * 100) + '%';
  $('#accuracy_calc').text(currentAccuracy);
}

function resetStats() {
  matches = null;
  attempts = null;
  $('#attempts_count').text(0);
  $('#accuracy_calc').text('0%');
}

function resetAllCards() {
  $('.back').removeClass('hidden');
  resetStats();
  shuffleCardOrder(cardClasses);
  setCardFronts();
}

function closeModal() {
  $('#win_modal').addClass('hidden');
}

function backButtonHandler() {
  $('.back_button').click(closeModal);
}

function playAgainButtonHandler() {
  $('.play_again_button').click(resetAllCards).click(closeModal);
}
