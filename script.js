$(document).ready(initializeApp)

var firstCardClicked = null;
var secondCardClicked = null;
var matches = null;
var max_matches = 9;
var attempts = null;
var games_played = null;
function initializeApp() {
  randomizer();
  var clickedCard = $('.cards').on('click', handleClickCard);
  return clickedCard;

}
//CLICK TOGGLER TO FIX THE BUGS----------------------------------------------------------------------
function turnClickHandlerOn() {
  $('.cards').on('click', handleClickCard);
}
function turnClickHandlerOff() {
  $('.cards').off('click', handleClickCard);
}
//CLICK HANDLER (CARD SELECTOR)----------------------------------------------------------------------
function handleClickCard(event) {
  $(event.currentTarget).find('.backOfCard').addClass('hidden');
  console.log(event.currentTarget);
  if (firstCardClicked === null) {
    firstCardClicked = $(event.currentTarget);
  } else {
    secondCardClicked = $(event.currentTarget);
    attempts++;
    var firstPick = firstCardClicked.find('.revealCard').css('background-image');
    var secondPick = secondCardClicked.find('.revealCard').css('background-image');
    turnClickHandlerOff();
    if (firstPick === secondPick) {
      console.log('The cards match!');
      matches++;
      firstCardClicked = null;
      secondCardClicked = null;
      turnClickHandlerOn();
    } else {
      setTimeout(function () {
        firstCardClicked.find('.backOfCard').removeClass('hidden');
        firstCardClicked = null;
        secondCardClicked.find('.backOfCard').removeClass('hidden');
        secondCardClicked = null;
        turnClickHandlerOn();
      }, 500);
    }
    displayStats();
  }
}
//ACCURACY-----------------------------------------------------------------------------------------
function calculateAccuracy() {
  var totalAccuracy = (matches / attempts) * 100;
  return totalAccuracy.toFixed(0);
}
//DISPLAY STATS------------------------------------------------------------------------------------
function displayStats() {
  var accuracy = calculateAccuracy();
  $('#attempts').text(attempts);
  $('#accuracy').text(accuracy + '%');
  if (matches === max_matches) {
    $('.modal').removeClass('hidden');
    $('.resetButton').on('click', resetStats);
    games_played++;
    $('#gamesPlayed').text(games_played);
  }
}
//RESET STATS---------------------------------------------------------------------------------------
function resetStats() {
  matches = null;
  attempts = null;
  $('#attempts').text(null);
  $('#accuracy').text(null);
  $('.backOfCard').removeClass('hidden');
  $('.modal').addClass('hidden');
  $('.mainContent').empty();
  randomizer();
  turnClickHandlerOn();
}
//RANOMDIZER----------------------------------------------------------------------------------------
function randomizer() {
  var cardImages = [
    'house-coffee', 'house-coffee',
    'japanese-matcha', 'japanese-matcha',
    'jasmine-milk-tea', 'jasmine-milk-tea',
    'strawberry', 'strawberry',
    'mint-sereno', 'mint-sereno',
    'sea-cream-black', 'sea-cream-black',
    'sunset', 'sunset',
    'taro', 'taro',
    'thai', 'thai'
  ];
  function shuffler() {
    var j, x, i = 0, len = cardImages.length;
    for (var i; i < len; i++) {
      j = Math.floor(Math.random() * len);
      x = cardImages[i];
      cardImages[i] = cardImages[j];
      cardImages[j] = x;
    }
    return cardImages;
  }
  shuffler();
  var completedRows = $('.mainContent');
  for (var rowIndex = 0; rowIndex < 3; rowIndex++) {
    var newRow = $('<div>').addClass('row');
    for (var sixCardsPerRow = 0; sixCardsPerRow < 6; sixCardsPerRow++) {
      var newCardSection = $('<div>').addClass('cards grow');
      newRow.append(newCardSection);
      var storeCoverCardInHere = $('<div>').addClass('backOfCard');
      var revealCardReadyToAdd = $('<div>').addClass('revealCard');
      var addThisCardToDOM = cardImages.pop();
      $(revealCardReadyToAdd).addClass(addThisCardToDOM);
      newCardSection.append(revealCardReadyToAdd, storeCoverCardInHere);
    }
    completedRows.append(newRow);
  }
}



/*
PSUEDO CODE FOR RANDOMIZER
--------------------------


RANDOMIZER FUNCTION
--------------------------------------------------------------------------------------------------------------------------------
- make a function for the randomizer
    - inside the function make an array that will contain all of the images
    - throw in the randomizer to shuffle the array(FISHER YATES SHUFFLER)
    - add in some type of loop to go through each item in the newly updated array
        - inside of the loop we're going to add the correct classes each card that the loop hits
        - need a way to take each item away in the array and use it (splice)
    - append the cards to the appropriate divs
- end of the function


NOTES ABOUT THE RANDOMIZER FUNCTION
--------------------------------------------------------------------------------------------------------------------------------
  - we want this function to happen on every reset so that the card will display differently everytime it's a new game
  - we want to make sure that the card shuffles everytime the user clicks reset or whenever the app loads
  - call the function in the displayStats function
  - call the function in the initialize app function
  - might have to append the cover card as well (the lfz logo)


USEFUL CODE THAT WILL BE NEEDED FOR THE RANDOMIZER
--------------------------------------------------------------------------------------------------------------------------------
FISHER YATES SHUFFLER
function arrayShuffler(theArray) {
  var j, x, i = 0, len = theArray.length;
  for (var i; i < len; i++) {
    j = Math.floor(Math.random() * len);
    x = theArray[i];
    theArray[i] = theArray[j];
    theArray[j] = x;
  }
  console.log(theArray);
}
*/
