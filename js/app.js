// variables
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
const overlay = document.getElementById('overlay');
const resetBtn = document.querySelector('.btn__reset');
let missed = 0;

// phrases array 
const phrases = ['break a leg', 'see eye to eye', 'hit the sack', 'spill the beans', 'better late than never'];

// arrow functions

// get random number (includes min number, excludes max number)
const getRandomNum = (min, max) => Math.floor(Math.random() * (max - min + min));

// get random phrases function return each letter as an item into a new array
const getRandomPhraseAsArray = (arr) => arr[getRandomNum(0, 5)].split('');

// loops through each letter adds to ul as an li
// adds class letter or space depending upon what it is
const addPhraseToDisplay = (arr) => {
    arr.forEach(char => {
        let li = document.createElement('li');
        li.className = (char === ' ') ? 'space': 'letter';
        li.textContent = char;
        phrase.querySelector('ul').appendChild(li);
    });
};

// reset game
const gameReset = () => {
    // need to reset hearts image value
    document.querySelectorAll(`li.tries img[src*='lostHeart']`).forEach(img => img.src="images/liveHeart.png");
    // remove classes and attributes from keyboard
    document.querySelectorAll('button.chosen').forEach(btn => {
        btn.removeAttribute('disabled');
        btn.removeAttribute('class');
    } );
    // clear phrase from screen
    phrase.querySelector('ul').replaceChildren();
    // reset lives
    missed = 0;
};

// remove heart icon from screen
const removeLife = () => {
    // change image of one of the heart icons
    document.querySelector(`img[src*='liveHeart']`).src = 'images/lostHeart.png'
    //change visibility rather than remove
    missed += 1;
};

// set content of overlay
const setOverlay = (display, overlayClass, h2Txt, btnText) => {
    overlay.style.display = display;
    overlay.className = overlayClass;
    overlay.querySelector('h2').innerText = h2Txt;
    overlay.querySelector('a').innerText = btnText;
};

// grabs all li els with class letter
// checks if match, add class show to li, otherwise null
const checkLetter = (btnValue) => {
    let grabLetters = document.querySelectorAll('li.letter');
    let letterFound = null;
    grabLetters.forEach(letter => {
        if (letter.innerText === btnValue) {
            letter.classList.add('show');
            letterFound = btnValue;
        }
    });
    return letterFound;
};

// check if win or loss
const checkWin = () => {
    let showLiLength = document.querySelectorAll('li.show').length;
    let letterLiLength = document.querySelectorAll('li.letter').length;
    // check if win
    if (showLiLength === letterLiLength) { setOverlay('flex', 'win', 'Winner!', 'Try your luck again?'); }
    // check if loss
    if (missed >= 5) { setOverlay('flex', 'lose', 'Aww shucks, you almost had it!', 'Play again?'); }
};

// checks value of clicked button 
// destructring event.target to = elemClicked
const checkBtn = ({target: elemClicked}) => {
    if (elemClicked.tagName === 'BUTTON') {
        // set class and disabled attribute
        elemClicked.className = 'chosen';
        elemClicked.setAttribute("disabled", "");
        // check if letter is in phrase on screen
        let letterFound = checkLetter(elemClicked.innerText);
        // if letter not found set key button class and remove life
        if (!letterFound) { 
            elemClicked.classList.add('wrong');
            removeLife(); 
        };
        // check if game is won or lost
        checkWin();
    }
};

// run when reset button is clicked
const getStarted = ({target: elemClicked}) => {
    // reset game if reset button isn't Start Game
    if (elemClicked.innerText !== 'Start Game')  {  gameReset(); }
    // hide overlay
    overlay.style.display = 'none';
    // get phrase
    const phraseArray = getRandomPhraseAsArray(phrases);
    // display phrase
    addPhraseToDisplay(phraseArray);
};

// add event listener to on screen keyboard
qwerty.addEventListener('click', checkBtn);

// add event listener to reset button
resetBtn.addEventListener('click', getStarted);