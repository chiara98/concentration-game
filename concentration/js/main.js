class BoardSquare {

  constructor(element, color){
    this.element = element;
    //this.color = color;

    this.element.addEventListener("click", this, false);
    this.isMatched = false;
    this.isFaceUp = false;
    this.setColor(color);
  }

  reset() {
    this.isFaceUp = false;
    this.isMatched = false;
    this.element.classList.remove('flipped');
  }

  matchFound() {
    this.isFaceUp = true;
    this.isMatched = true;
  }

  handleEvent(event){
    switch(event.type) {
      case "click":
      if(this.isFaceUp || this.isMatched){
        return;
      }
      this.isFaceUp = true;
      this.element.classList.add('flipped');

      squareFlipped(this);
    }
  }




  //method 1
  setColor(color) {
    const faceUpElement = this.element.getElementsByClassName('faceup')[0];

    faceUpElement.classList.remove(this.color);


    this.color = color;
    faceUpElement.classList.add(color);
  }
}






function generateHTMLForBoardSquares(){
  const numberOfSquares = 16;
  let squaresHTML = '';

  // Generates HTML for board squares
  for(let i = 0; i < numberOfSquares; i++){
    squaresHTML += '<div class="col-3 board-square">\n' +
    '<div class="face-container"> \n' +
    '<div class="facedown"></div>\n' +
    '<div class="faceup"></div>\n' +
    '</div>\n' +
    '</div>\n';
  }

  // Insert squares HTML in DOM
  const boardElement = document.getElementById('gameboard');
  boardElement.innerHTML = squaresHTML;

}

generateHTMLForBoardSquares();

const colorPairs = [];


function generateColorPairs() {
  if (colorPairs.length > 0) {
    return colorPairs;
  } else {
    // generates matching pair for each color
    for (let i = 0; i < 8; i++) {
      colorPairs.push('color-' + i);
      colorPairs.push('color-' + i);
    }

    return colorPairs;
  }
}

function shuffle(array) {
  // const array = [];
  let currentIndex = array.length;
  let randomIndex, temporaryValue;

  while(0 !== currentIndex) {
    // Pick a remaining element
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    //Swap it with the currentIndex
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
}
// Creats a function that returns a shuffled array of matching color pairs
function shuffleColors() {
  const colorPairs = generateColorPairs()
  return shuffle(colorPairs);
}

const boardSquares = [];
function setupGame() {

  generateHTMLForBoardSquares();

  const randomColorPairs = shuffleColors();
  // 1
  const squareElements = document.getElementsByClassName("board-square");

  // 2
  for (let i = 0; i < squareElements.length; i++) {
    const element = squareElements[i];
    const color = randomColorPairs[i];
    // 3
    const square = new BoardSquare(element, color)

    // 4
    boardSquares.push(square);
  }
}

setupGame();

let firstFaceupSquare = null;

function squareFlipped(square) {
  // 2
  if (firstFaceupSquare === null) {
    firstFaceupSquare = square;
    return
  }

  // 3
  if (firstFaceupSquare.color === square.color) {
    // 4
    firstFaceupSquare.matchFound();
    square.matchFound();

    firstFaceupSquare = null;
  } else {
    // 5
    const a = firstFaceupSquare;
    const b = square;

    firstFaceupSquare = null;

    setTimeout(function() {
      a.reset();
      b.reset();
    }, 400);
  }
}

const resetButton = document.getElementById("reset-button");
resetButton.addEventListener('click', () => {
  resetGame();
});

function resetGame(){
  firstFaceupSquare = null;
  boardSquares.forEach((square) => {
    square.reset()
  });

  setTimeout(() => {
    const randomColorPairs = shuffleColors();
    for(let i = 0; i < boardSquares.length; i++){
      const newColor = randomColorPairs[i];
      const square = boardSquares[i];

      square.setColor(newColor);
    }
  }, 500);
}
