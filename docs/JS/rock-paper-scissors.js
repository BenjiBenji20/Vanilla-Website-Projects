const handButtonElement = document.querySelectorAll('.hand-btn');
const resetscoreButtonElement = document.querySelector('.reset-btn');
const HTMLBodyElemet = document.body;


// Declate local storage to save scores
var score = JSON.parse(localStorage.getItem('score')) || {
  wins: 0,
  losses: 0,
  ties: 0
};

// Show default score
updateScore();

// Events for clicking each button
// Player Move buttons
handButtonElement.forEach(button => {
  const playerMove = button.value;

  button.addEventListener('click', () => {
    playGame(playerMove);
  });
});


// Reset score button
resetscoreButtonElement.addEventListener('click', (event) => {
  // Reset the score values in memory and local storage
  localStorage.removeItem('score'); // Remove from local storage
      
  score = { // Reset the in-memory score object as well
    wins: 0,
    losses: 0,
    ties: 0
  };

  updateScore();

  if(event.target.value === 'reset') { // clear the result and moves par when clicked reset btn
    document.querySelector('.result-par').innerHTML = '';
    document.querySelector('.moves').innerHTML = '';
  }
});


// Auto play button
let isAutoPlaying = false;
let intervalID;

document.querySelector('.auto-play-btn').addEventListener('click', () => {
  if(!isAutoPlaying) {
    intervalID = setInterval(function() {
      const playerMove = pickComputerMove();
  
      playGame(playerMove);
    }, 1500); // auto play every 3 second
    isAutoPlaying = true;

    document.querySelector('.auto-play-btn').innerHTML = 'Stop Playing';
  }
  else {
    clearInterval(intervalID);
    isAutoPlaying = false;

    document.querySelector('.auto-play-btn').innerHTML = 'Auto Play';
  }
});


// on key down events
HTMLBodyElemet.addEventListener('keydown', (event) => {

  if(event.key.toLowerCase() === 'r') {
    playGame('Rock');
  }
  else if(event.key.toLowerCase() === 'p') {
    playGame('Paper');
  }
  else if(event.key.toLowerCase() === 's') {
    playGame('Scissors');
  }
  else {
   showWarning(); 
  }
});

// showing warning if click unrecognized key
const warning = document.querySelector('.warning');
let isShowWarning = false;
let warningIntervalID;

function showWarning() {
  if(!isShowWarning) {
    warningIntervalID = setInterval(() => {
      warning.innerHTML = 'Invalid key! Press R, P, or S.';
    }, 500);

    isShowWarning = true;
  }
  else {
    clearInterval(warningIntervalID);
    isShowWarning = false;

    warning.innerHTML = '';
  }
}


// player and computer move Functions
function playGame(playerMove) {
  const computerMove = pickComputerMove();
  var result = '';

  // Add hand icons to moves
  const handIcons = {
    'Rock': '&#9994;',       // Rock hand icon
    'Paper': '&#128400;',    // Paper hand icon
    'Scissors': '&#9996;'    // Scissors hand icon
  };

  const faceIcons = {
    'win': '&#128512',  // smiley icon
    'lose': '&#128532', // sad icon
    'tie': '&#128540' // naughty icon
  }

  // Player chose scissors
  if (playerMove === 'Scissors') {
    if (playerMove === computerMove) {
      result = 'tie';
    } else if (computerMove === 'Rock') {
      result = 'lose';
    } else {
      result = 'win';
    }
  } 
  // Player chose paper
  else if (playerMove === 'Paper') {
    if (playerMove === computerMove) {
      result = 'tie';
    } else if (computerMove === 'Scissors') {
      result = 'lose';
    } else {
      result = 'win';
    }
  } 
  // Player chose rock
  else {
    if (playerMove === computerMove) {
      result = 'tie';
    } else if (computerMove === 'Paper') {
      result = 'lose';
    } else {
      result = 'win';
    }
  }

  // Update score based on results
  if (result === 'win') {
    score.wins++;
  } else if (result === 'lose') {
    score.losses++;
  } else {
    score.ties++;
  }

  // Save scores to the local storage
  localStorage.setItem('score', JSON.stringify(score));

  // Display the result with hand icons
  const resultElem = document.querySelector('.result-par');
  const moveElem = document.querySelector('.moves');

  resultElem.innerHTML = `You ${result} ${faceIcons[result]}.`;
  moveElem.innerHTML = `You ${playerMove} ${handIcons[playerMove]} - ${handIcons[computerMove]} ${computerMove} Computer`;

  // Display score
  updateScore();
}

// Modify the scores
function updateScore() {
  document.querySelector('.score').innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
}

// Function to pick a random computer move
function pickComputerMove() {
  var randomNumber = Math.random();
  var computerMove = '';

  // Determine computer's move based on random number
  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = 'Rock';
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = 'Paper';
  } else {
    computerMove = 'Scissors';
  }

  return computerMove;
}



