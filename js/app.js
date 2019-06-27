let cards = ['fa-diamond', 'fa-diamond',
             'fa-paper-plane-o','fa-paper-plane-o',
             'fa-anchor','fa-anchor',
             'fa-bolt','fa-bolt',
             'fa-cube','fa-cube',
             'fa-bomb','fa-bomb',
             'fa-bicycle','fa-bicycle',
             'fa-leaf','fa-leaf'
            ];

let moveCounter = document.querySelector('.moves-count');
let moveText = document.querySelector('.moves-text'); 
let deck = document.querySelector('.deck');  
let stars = document.getElementById('stars-list');
let timerHours = document.querySelector('.timer .hours');
let timerMins = document.querySelector('.timer .minutes');
let timerSeconds = document.querySelector('.timer .seconds');

const restart = document.querySelector('.restart');
const close = document.querySelector('.modal-close-btn');
const replay = document.querySelector('.modal-replay-btn');
const modal = document.querySelector('#game_modal');
const modalMoves = document.querySelector('.modal-body .moves-count');
const modalHours = document.querySelector('.modal-body .hours');
const modalMins = document.querySelector('.modal-body .mins');
const modalSeconds = document.querySelector('.modal-body .seconds');
const modalRating = document.querySelector('.modal-body .rating');

// number of moves   
let moves = 0;

// number of matches  
let matches = 0;

// Number of start
let rating = 3;

// list of open cards  
let openCards = []

// record when the game started
let gameStarted = false

// define the time here
let elapsedSeconds = 0;
let hour = 0;
let min = 0;
let sec = 0;

//  define timer
let timer = undefined;

// reset button, replay button, close button
restart.addEventListener('click', resetGame);
replay.addEventListener('click', replayGame);
close.addEventListener('click', closeModal);

// start the game  
resetGame();

function startTimer() {
  if (!gameStarted) {
      gameStarted = true;
      timer = setInterval(setTime, 1000);
  }
}

function stopTimer() {
  gameStarted = false;
  clearInterval(timer);
}

function setTime() {
  let remainderSeconds = ++elapsedSeconds;
  hour = parseInt(remainderSeconds / 3600);
  timerHours.textContent = stringifyTime(hour);
  remainderSeconds = remainderSeconds % 3600;
  min = parseInt(remainderSeconds / 60)
  timerMins.textContent = stringifyTime(min);
  remainderSeconds = remainderSeconds % 60;
  sec = remainderSeconds;
  timerSeconds.textContent = stringifyTime(sec);
}

function generateCard(card) {
  return `<li class="card" data-card="${card}"><i class = "fa ${card}"></i></li>`; 
}  

//reset the entire game, including time and deck
function resetGame() { 
  let cardHTML = shuffle(cards).map(function(card) {
    return generateCard(card);
  });
  //reset moves
  moves = 0;

  //reset matches
  matches = 0;
  moveCounter.innerText = moves; 

  //reset time
  elapsedSeconds = 0;
  hour = 0;
  min = 0;
  sec = 0;
  timerHours.textContent = '00';
  timerMins.textContent = '00';
  timerSeconds.textContent = '00';

  // Stop timer
  stopTimer();
  
  //shuffle the cards
  deck.innerHTML = cardHTML.join('');
  allCards = document.querySelectorAll('.card'); 

  allCards.forEach(function(card){
    card.addEventListener('click', showCard)
  });
}

//replay the game in the modal
function replayGame() {
  closeModal();
  resetGame();
}

//flip a card
function showCard(event){
  startTimer(); 
  let target = event.target;
  const parent = target.parentElement;
  if (parent.classList.contains('card')) {
    target = parent;
  }

  if (!openCards.includes(target)) {
    target.classList.add('open', 'show');
    openCards.push(target);
    matchChecker();
  }
}

//check if two flipped cards match
function matchChecker(){
  const length = openCards.length;
  if (length == 2) {
    const first_card = openCards[0]  
    const second_card = openCards[1]
    incrementMove();   
    if (first_card.dataset.card == second_card.dataset.card) {
      matchCard(first_card);
      matchCard(second_card);
      matchIncrementor();
      winChecker();
    } else {
      closeCard(first_card);
      closeCard(second_card);
    }
    openCards = []
  }
}

//adjust the text for move(s)
function incrementMove() {
  moves++;
  moveCounter.innerText = moves;
  if (moves === 1) {
    moveText.innerText = ' Move';
  } else {
    moveText.innerText = ' Moves';
  }
  ratingChecker();
}

//check the rating for moves
function ratingChecker() {
  if (moves === 12) {
      rating--;
      stars.removeChild(stars.children[0])
  } else if (moves === 20) {
      rating--;
      stars.removeChild(stars.children[0])
  } else if (moves === 27) {
      rating--;
      stars.removeChild(stars.children[0])
  }
}

function matchIncrementor() {
  matches++; 
}

function winChecker() {
  if (matches === 8) {
    stopTimer();
    openModal();
  }
}

// Function to add 'match' class to card
function matchCard(card) {
  card.classList.add('match');
}

// Function to remove 'open and show' class to card
function closeCard(card) {
  setTimeout(function() {
    card.classList.remove('open', 'show')
  }, 500);
}

// open the modal
function openModal() {
  modalHours.textContent = hour > 0 ? `${hour} hours, ` : '';
  modalMins.textContent = min > 0 ? `${min} minutes, ` : '';
  modalSeconds.textContent = `${sec} seconds`;
  modalMoves.textContent = `${moves} moves`;
  modalRating.textContent = rating;
  modal.style.display = 'block';
}

// close the modal
function closeModal() {
  modal.style.display = 'none';
}

// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  while (currentIndex !== 0) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];  
      array[randomIndex] = temporaryValue;
  }
  return array;  
}

// description Convert min, hour & seconds into string
function stringifyTime(val) {
  var valString = val + '';
  return valString.length >= 2 ? `${val}` : `0${val}`;
}