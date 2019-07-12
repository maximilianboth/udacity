/*
 * Create a list that holds all of your cards
 */

/*
 * Display the cards on the page
 *   - shuffle the list of cards using the provided "shuffle" method below
 *   - loop through each card and create its HTML
 *   - add each card's HTML to the page
 */

// Shuffle function from http://stackoverflow.com/a/2450976

let seconds = 0;
let minutes = 0;
let displaySeconds = 0;
let displayMinutes = 0;
const clicking = document.querySelector('.deck');

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

createDeck()
function createDeck() {
   
	const cardList = document.querySelectorAll('.card');
	const cardArray = Array.from(cardList);
    const randArray = shuffle(cardArray);
    for (const oldCard of cardList){
		oldCard.remove(); 
	}
	const deckFragment = document.createDocumentFragment();
    
    for (i=0; i < randArray.length; i++) {
		newCard = document.createElement('li');
		newCard.innerHTML = randArray[i].innerHTML; 
		newCard.className = randArray[i].className;
		deckFragment.appendChild(newCard);
	}
	const newDeckList = document.querySelector('.deck');
    newDeckList.appendChild(deckFragment);
    timer();
    
}

clickCards()

let tempCards = [];
let matchCards = [];

function clickCards() {

    clicking.addEventListener('click', cardClicking);

function cardClicking(e) {
    
        const target = e.target;
        if (target.className === 'card') {
            target.classList.add('open');
            movesIncrease();
            gameRating();

            tempCards.push(target);
        }

        if(tempCards.length === 2) {
            
            if (tempCards [0].innerHTML === tempCards [1].innerHTML) {

                matching();

            } else {
                tempCards[0].classList.add('nomatch') & tempCards[1].classList.add('nomatch');
                setTimeout(noMatching, 800);
                clicking.removeEventListener('click', cardClicking);
                setTimeout(clickCards, 800);
            }
        }
    }
}


 function timer() {
     seconds ++;

     if (seconds % 60 ===0) {
         minutes++;
         seconds = 0;
     }

     if (seconds < 10) {
         displaySeconds = "0" + seconds.toString();
     } else {
         displaySeconds = seconds;
     }

     if (minutes < 10) {
        displayMinutes = "0" + minutes.toString();
    } else {
        displayMinutes = minutes;
    }

     document.querySelector('.timer').innerHTML = displayMinutes + ":" + displaySeconds;
 }

 window.setInterval(timer, 1000);


function matching() {
    matchCards.push.apply(matchCards,tempCards);
    const match  = document.querySelectorAll ('.open');
    for (const card of match) {
        card.classList.replace('open', 'match');
    }
    tempCards = [];
    if (matchCards.length === 16) {
        setTimeout(winning, 500);
        }
}

function noMatching() {

    const noMatch = document.querySelectorAll('.open');
    for (const cards of noMatch) {
        cards.classList.remove('open','nomatch');
        }
    
    tempCards = [];
}

var countDisplay = 0;
var countStars = 3;
var count = 0;

function movesIncrease() {
        const button = document.querySelector('.moves');
        count += 1;
        if (count % 2 === 0) {
            countDisplay += 1;
            button.innerHTML = countDisplay;
        }

        if (countDisplay === 13) {
            countStars = 2;
        } else if (countDisplay === 16) {
            countStars = 1;
        }
        else {
            countStars === 3;
        }
}

let stars = document.querySelector('.stars').childNodes;
const emptyStar = document.querySelectorAll('.fa-star-o');


function gameRating() {
        if (countDisplay === 13) {
        stars[5].remove();
        emptyStar[0].classList.add('visible');
    }
    if (countDisplay === 16) {
        stars[3].remove();
        emptyStar[1].classList.add('visible');
    }    
}

function winning () {
    const parent = document.querySelector('body');
    const win = document.querySelector('.container');
    const winningMoves = document.querySelector('.winmoves');
    const winStars = document.querySelector('.winstars');
    const winMinutes =document.querySelector('.winminutes');
    const winSeconds = document.querySelector('.winseconds');
    parent.removeChild(win);
    const winner = document.querySelector('.hide');
    winner.classList.add('won');

    winningMoves.innerHTML = countDisplay;
    winStars.innerHTML = countStars;
    winMinutes.innerHTML = displayMinutes;
    winSeconds.innerHTML =displaySeconds;

    const anotherRound = document.querySelector('.button');
    anotherRound.addEventListener('click', function () {
            window.location.reload();
    })
}

repeat()
function repeat() {
    const newTry = document.querySelector('.restart');
    newTry.addEventListener('click', function() {
        window.location.reload();
    })
}



/*

 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
