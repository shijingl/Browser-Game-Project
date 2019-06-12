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

// number of moves
let moves = 0;

// number of matches 
let matches = 0;

function generateCard(card) {
  return `<li class="card" data-card="${card}"><i class = "fa ${card}"></i></li>`; 
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

function initGame() { 
  let deck = document.querySelector('.deck');
  
  let cardHTML = shuffle(cards).map(function(card) {
    return generateCard(card);
  });
  moves = 0;
  moveCounter.innerText = moves;  

  deck.innerHTML = cardHTML.join('');
}

initGame();

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


let allCards = document.querySelectorAll('.card');
let openCards = []

allCards.forEach(function(card){
  card.addEventListener('click', function(e) { 
    if (!card.classList.contains('open') && !card.classList.contains('show') && !card.classList.contains('match')) {
      openCards.push(card);
      card.classList.add('open', 'show')

      // if cards don't match, go away
      if (openCards.length == 2) {
        if (openCards[0].dataset.card == openCards[1].dataset.card) {
          matchCard(openCards[0]);
          matchCard(openCards[1]);

          matchIncrementor();
          openCards = [];
          winChecker();
        } else {
          //hide 
          setTimeout(function() {
            
            openCards.forEach(function(card) {
              card.classList.remove('open', 'show')
            }); 
            
            openCards = [];
          }, 1000);
        }

        incrementMove(); 
      }
    }   
  });
});