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
var musicCurrentlyPlaying = false;

var cardClasses = [
  'cfalcon',
  'cfalcon',
  'donkeykong',
  'donkeykong',
  'fox',
  'fox',
  'kirby',
  'kirby',
  'link',
  'link',
  'mario',
  'mario',
  'pikachu',
  'pikachu',
  'samus',
  'samus',
  'yoshi',
  'yoshi'
];

function initializeApp() {
  shuffleCardOrder(cardClasses);
  setCardFronts();
  addClickHandler();
  backButtonHandler();
  playAgainButtonHandler();
  muteButtonHandler();
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
    $(cardID).find('.front').removeClass('cfalcon donkeykong fox kirby link mario pikachu samus yoshi');
    $(cardID).find('.front').addClass(cardClasses[i - 1]);
  }
}

function addClickHandler() {
  $('.card.back').click(handleCardClick);
}

function handleCardClick(event) {
  var targetCard = $(event.currentTarget);
  if (targetCard.hasClass('back')) {
    targetCard.off('click');
    targetCard.parent().toggleClass('flip');
    setTimeout(function(){
      targetCard.addClass('hidden');
    }, 300);
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
    playCorrectMatchSound();
    removeMatchedStock();
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
  firstCardDiv.toggleClass('flip');
  secondCardDiv.toggleClass('flip');
}

function resetClickedCards() {
  firstCardClicked = null;
  secondCardClicked = null;
}

function checkWin() {
  if (matches === maxMatches) {
    setTimeout(function(){
      $('#win_modal').removeClass('hidden');
      playWinSound();
    }, 800);
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
  $('.card_div').removeClass('flip');
  $('.stock_head').removeClass('hidden pop');
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

function playWinSound() {
  document.getElementById('game_sound').play();
}

function playCorrectMatchSound() {
  var soundToPlay = secondCardCheckFront.slice(secondCardCheckFront.lastIndexOf('/') + 1, secondCardCheckFront.lastIndexOf('.'));
  var soundToPlayID = soundToPlay + '_sound';
  document.getElementById(soundToPlayID).play();
}

function removeMatchedStock() {
  var characterMatched = secondCardCheckFront.slice(secondCardCheckFront.lastIndexOf('/') + 1, secondCardCheckFront.lastIndexOf('.'));
  var characterMatchedID = '#' + characterMatched + '_stock';
  $(characterMatchedID).addClass('pop');
  setTimeout(function(){
    $(characterMatchedID).addClass('hidden');
  }, 300);
}

function playBackgroundMusic() {
  document.getElementById('background_music').play();
}

function pauseBackgroundMusic() {
  document.getElementById('background_music').pause();
}

function muteButtonHandler() {
  $('#mute_button, #unmute_button').click(handleMuteClick);
}

function handleMuteClick() {
  if (musicCurrentlyPlaying) {
    pauseBackgroundMusic();
  } else {
    playBackgroundMusic();
  }
  musicCurrentlyPlaying = !musicCurrentlyPlaying;
  $('#mute_button, #unmute_button').toggleClass('hidden');
}
