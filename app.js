/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
/**************************************** 
         ***    Main Variables   ***
 ****************************************/
var scores, roundScore, activePlayer, gamePlaying;

// Start The Game
init();

/**********************************
      *** "ROLLDICE" Button  ***
***********************************/

document.querySelector('.btn-roll').addEventListener('click', function() {
if(gamePlaying) {
//1. Random Number
var dice = Math.floor(Math.random() * 6) +1;  // Get random number from 0 to 6

//2. Display the result
var diceDom = document.querySelector('.dice');
diceDom.style.display = 'block';  // appear the dice 
diceDom.src = 'img/dice-' + dice + '.png';

//3. Update the round score IF the rolled number was NOT a 1
if(dice !== 1) {
  // Add Score
  roundScore += dice;
  document.querySelector('#current-' + activePlayer).textContent = roundScore;
} else {
  // Next Player
 nextPlayer();
  }
 }
});

/******************************************************
         ******      Hold Button    ******
*******************************************************/   
document.querySelector('.btn-hold').addEventListener('click', function() {
      if(gamePlaying){
      // Add Current Score to Global Score
      scores[activePlayer] += roundScore;

      // Update the UI
      document.querySelector('#score-' + activePlayer).textContent = scores[activePlayer];

      // Check if player won the game
      if (scores[activePlayer] >= 100) {
            gamePlaying = false;
            document.querySelector('#name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.dice').style.display = 'none';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.player-' + activePlayer + '-panel').classList.remove('active');
      } else {
            // Next Player
            nextPlayer();
      }
   }
});

/*****************************************************
        *****    New Game Button    *****
******************************************************/
document.querySelector('.btn-new').addEventListener('click', init);


/**************************************************** 
            *****     Functions    ***** 
*****************************************************/
function init() {
      gamePlaying = true;
      scores= [0,0]; // scores for player1 & player2
      roundScore= 0; // the scores that player has gained 
      activePlayer= 0; // put 0 or 1 to determine which player is active
      
      // Hide the Dice
      document.querySelector('.dice').style.display = 'none'; 

      // Start The Game
      document.getElementById('score-0').textContent = '0';
      document.getElementById('score-1').textContent = '0';
      document.getElementById('current-0').textContent = '0';
      document.getElementById('current-1').textContent = '0';
      document.getElementById('name-0').textContent = 'Player 1';
      document.getElementById('name-1').textContent = 'Player 2';
      document.querySelector('.player-0-panel').classList.remove('winner');
      document.querySelector('.player-1-panel').classList.remove('winner');
      document.querySelector('.player-0-panel').classList.remove('active');
      document.querySelector('.player-1-panel').classList.remove('active');
      document.querySelector('.player-0-panel').classList.add('active');
      
      
}

function nextPlayer() {
      activePlayer === 0 ? activePlayer = 1 : activePlayer = 0;
      roundScore = 0; // set the score to zero again
    
      document.getElementById('current-0').textContent = '0';
      document.getElementById('current-1').textContent = '0';
      
      // activate the current player
      document.querySelector('.player-0-panel').classList.toggle('active');
      document.querySelector('.player-1-panel').classList.toggle('active');
      
      // hide the dice to start new play
      //document.querySelector('.dice').style.display = 'none';
    
}



