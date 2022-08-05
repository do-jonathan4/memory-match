var gameCards = document.getElementById('gameCards')
var firstCardClicked;
var secondCardClicked;
var firstCardClasses;
var secondCardClasses;
var maxMatches = 9;
var matches = 0;
var maxAttempts = 5;
var attempts = 0;
var gamesPlayed = 0;
var gamesPlayedNum = document.getElementById('gamesPlayedNum')
var attNum = document.getElementById('attNum')
var accuracyNum = document.getElementById('accuracyNum')
//fix hidden cards
var hiddenCards = document.querySelectorAll('.card-back')
var modal = document.querySelector('.modal')
var resetButton = document.getElementById('resetButton')
var cardList = [
  'apple-logo',
  'banana-logo',
  'cherry-logo',
  'coconut-logo',
  'manadrin-logo',
  'melon-logo',
  'orange-logo',
  'peach-logo',
  'pineapple-logo',
  'apple-logo',
  'banana-logo',
  'cherry-logo',
  'coconut-logo',
  'manadrin-logo',
  'melon-logo',
  'orange-logo',
  'peach-logo',
  'pineapple-logo'
]

gameCards.addEventListener('click', handleClick)
resetButton.addEventListener('click', resetGame)
cardCreation()

function handleClick (event) {
  if (event.target.className.indexOf("card-back") === -1) {
    return;
  }
  event.target.classList.add('hidden')
  if (!firstCardClicked) {
    firstCardClicked = event.target
    firstCardClasses = firstCardClicked.previousElementSibling.className
  }
  else {
    secondCardClicked = event.target
    secondCardClasses = secondCardClicked.previousElementSibling.className
    gameCards.removeEventListener('click', handleClick)

    if (firstCardClasses === secondCardClasses) {
      gameCards.addEventListener('click', handleClick)
      firstCardClicked = null
      secondCardClicked = null
      matches++
      attempts++
      displayStats()
      if (matches === maxMatches) {
        modal.classList.remove('hidden')
      }
    }
    else {
      setTimeout(function() {
        firstCardClicked.classList.remove('hidden')
        secondCardClicked.classList.remove('hidden')
        firstCardClicked = null
        secondCardClicked = null
        gameCards.addEventListener('click', handleClick)
        attempts++
        displayStats()
      }, 1500)
      if (attempts === maxAttempts) {
        modal.firstElementChild.firstElementChild.textContent = 'You Have Loss'
        modal.classList.remove('hidden')
      }
    }
  }
}

function displayStats () {
  gamesPlayedNum.textContent = gamesPlayed
  attNum.textContent = attempts
  accuracyNum.textContent = calculateAccuracy(attempts, matches)
}
function calculateAccuracy (attempts, matches) {
  var result = matches / attempts * 100
  if (attempts === 0) {
    return '0%'
  }
  else {
    return Math.floor(result) + '%'
  }
}

function resetGame () {
  matches = 0
  attempts = 0
  gamesPlayed++

  displayStats()
  resetCards()
  shuffle()
  modal.classList.add('hidden')
}
function resetCards () {
  console.log('hello')
  console.log(hiddenCards.length)
  for (var i = 0; i < hiddenCards.length; i++) {
    hiddenCards[i].classList.remove('hidden')
  }
}

function cardCreation () {
  shuffle()
  for (var i = 0; i < cardList.length; i++) {
    var cardContainer = document.createElement('div')
    var cardFront = document.createElement('div')
    var cardBack = document.createElement('div')

    cardContainer.className = 'card col-2'
    cardFront.classList.add('card-front')
    cardFront.classList.add(cardList[i])
    cardBack.classList.add('card-back');

    cardContainer.append(cardFront)
    cardContainer.append(cardBack)
    gameCards.append(cardContainer)
  }
}

function shuffle () {
  for (var i = 0; i < cardList.length; i++) {
    var j = Math.floor(Math.random() * cardList.length)
    var temp = cardList[i]
    cardList[i] = cardList[j]
    cardList[j] = temp
  }
}
