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
// let allCards = document.querySelectorAll('.card'); 

// number of moves   
let moves = 0;

// number of matches  
let matches = 0;

// start the game  
initGame();

// list of open cards  
let openCards = []

/*
allCards.forEach(function(card){
  card.addEventListener('click', function(e) { 
    if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
      openCards.push(card);
      card.classList.add('open', 'show')
      first_card = openCards[0]  
      second_card = openCards[1]

      // if cards don't match, go away  
      if (openCards.length == 2) {
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
        incrementMove(); 
      }
    }   
  });
});
*/

function generateCard(card) {
  return `<li class="card" data-card="${card}"><i class = "fa ${card}"></i></li>`; 
}  

function initGame() {  
  let cardHTML = shuffle(cards).map(function(card) {
    return generateCard(card);
  });
  moves = 0;
  moveCounter.innerText = moves; 
  deck.innerHTML = cardHTML.join('');
  allCards = document.querySelectorAll('.card'); 

  allCards.forEach(function(card){
    card.addEventListener('click', showCard)
  });
}

function showCard(event){
  let target = event.target;
  const parent = target.parentElement;
  if (parent.classList.contains('card')) {
    target = parent;
  }

  if (!openCards.includes(target)) {
    target.classList.add('open', 'show');
    openCards.push(target);
  }
}

function incrementMove() {
  moves++;
  moveCounter.innerText = moves;
  if (moves === 1) {
    moveText.innerText = ' Move';
  } else {
    moveText.innerText = ' Moves';
  }
}

function matchIncrementor() {
  matches++; 
}

function winChecker() {
  if (matches === 8) {
    console.log('you win!!');
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

/*===============================Helper Functions============================*/

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