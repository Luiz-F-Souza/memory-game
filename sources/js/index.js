const containerTheGame = document.querySelector(".the-game")

const allContainerCards = document.querySelectorAll(".container--cards")

const allBackFaces = document.querySelectorAll(".back-face")

const lifes = document.querySelector(".header")

const initBtn = document.querySelector(".btn-init")

// ******** all start by saying sorry for my bad english, i got to practice. ********

// All backFaces starts with ("hidden") class, This is to keep the cards open for 4s, then it ill close them
function waitingToHide(){

  // to remove all "hidden" after 4s
  allBackFaces.forEach(backFace =>{
    setTimeout(() =>{
      backFace.classList.remove("hidden")
    }, 4000)
  })
}
waitingToHide()


// this simple change the order of all cards containers using style.order with random numbers. (to keep the cards in different positions always that the game begins)
function shuffleCards() {
  allContainerCards.forEach(container =>{
    container.style.order = Math.trunc(Math.random() * 21)
  })
}
shuffleCards()

// empty array that recieves data from eventListener. this recieves data related to the chosen cards. 
// First recieve the class from front face, which backface was selected and the parent of that. 
// (after recieve that 2 times, it send data to chekingCards function. this function takes care of somethings and then reset this variable.)
let chosenCards = [] 

let parent // just to reciev which is the parent of the selected card (it is used to give data to "chosenCards" arr)
let stopGame = false // if true it prevents the user to click another card (while waiting setTimeOut of "checkingCards")
let remainigLifes = 5 // this is the count of how many lifes the user has. it is used to hidde and show hearts in the game. when reachs 0 or less it will make "lost" variable turn to true.
let lost = false // when true it prevents the user to keep playing and gives an message telling to start a new game



// this cheks if card01 its equal to card02. recieve data from "chosenCards" arr. card01 and card02 are the class with the name of the card. elToUnFlip1 an ..2 are the backFace of the cards selected
// parentToUnFlip1 and ...2 are the parent of the chosen cards.
// it starts checking if card01 its different to card02 and if the card02 its already has been selected. if false it means that the user found two equal cards.
// if the user has found and the card its a heart, it will take "remainingLifes" and add 2. then it will loop and remove all "hidden" from the hearts until it reaches the value of "remainingLife" variable.
// if the user chosen wrong, it ill set "stopGame" to true (so it will prevent event listener to run while setTimeOut hasnt finished)
// after that it will remove "flip" class from the backfaces and parents. it will make the card unflip and returns to beeing hidden.
// it will reset chosenCards Arr, parent, set stopGame to true and check if puts true or false to lost (only if remainingLifes its equal or less than 0)
function checkingCards(card01,elToUnFlip1,parentToUnFlip1,card02,elToUnFlip2,parentToUnFlip2){
 if(card01 != card02 && card02){
  
  stopGame = true


  setTimeout(()=>{

    // to unflip cards by taking of the class that make them "visible"
    elToUnFlip1.classList.remove("flip")
    elToUnFlip2.classList.remove("flip")
    parentToUnFlip1.classList.remove("flip")
    parentToUnFlip2.classList.remove("flip")

  
    chosenCards = [] //reset 
    parent = null // reset
    remainigLifes < 0 ? stopGame = true : stopGame = false // reset or keep
    remainigLifes <= 0 ? lost = true : "" //check if remainingLifes is  equal or less than  0 to set to true or to false.

    lost ? alert("Você ficou sem vidas 😭 Inicie um novo jogo para continuar"):""

  },3000)

  if(remainigLifes <= 0 ){
    
    alert("Você ficou sem vidas 😭 Inicie um novo jogo para continuar")
   
  }else{
    lifes.children[remainigLifes].classList.add("hidden") // to hidde the heart that represents the lost life
    remainigLifes-- // to count down the variable

  }
 
 }else if(card02){
  //it will only enter here if the user has choosen correctly both cards.
  if(card01 === "heart"){
    remainigLifes = remainigLifes + 2 // gives extra life to the counter

    for(i = 0; i <= remainigLifes; i++){

      lifes.children[i].classList.remove("hidden") // loops over the amount of hearts and take of the "hidden" from thoose that are below or equal the variable "remainigLifes"
    }
  }
  
  chosenCards = [] // reset
  parent = null //reset
 }
}


//to add eventListener to all backFaces when the user click it (only to backFaces becouse the front should never been fliped by the user)
allBackFaces.forEach(backFace =>{
  backFace.addEventListener("click", e=> {


    // starts checking if lost is true. if it is it will tell the user to start a new game
    if(lost){
      
      alert("Você ficou sem vidas 😭 Inicie um novo jogo para continuar")
      return

    }
    // it checks if stopGame is false, if it is, then it will enter the if scope.
    if(!stopGame){
      
      parent = backFace.parentElement // selecting which is the parent of the card

      backFace.classList.add("flip") // to flip the backface
      parent.classList.add("flip") // to flip the parent of backface and frontFace

      chosenCards.push(parent.children[0].classList[2],backFace,parent) // to send data to chosenCards, that later will recieve another round of data. (it will be reset by checkingCards() when it recieves it 2 times)

      checkingCards(...chosenCards) // to give data by desestructuring chosenCards.
    }

   

    
    
 
  })
})

// just to reload the page and start a new game when click "initBtn"
initBtn.addEventListener("click", e =>{
  document.location.reload()
})




