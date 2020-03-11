'use strict';
console.log('This is the Pizza Tracker, linking up');
//These are in an html collection(array) use ref to image index instead of id's for tracking images shown we are still going to count total clicks and each image's click amount.
var imageElements = document.getElementsByTagName('img');

var pizzaIndex1 = 0;
var pizzaIndex2 = 1;
var rounds = 5;
var allPizzas = [];

//Add a constructor function for our pizzas
function Pizza(name, imageUrl){
  this.name = name;
  this.imageUrl = imageUrl;
  this.timesClicked = 0;
  this.timesShown = 0;
  allPizzas.push(this);
}



// actually create our Pizza's
new Pizza('Detroit Style', 'images/detroitPizza.jpeg');
new Pizza('New York Thin', 'images/newYorkPizza.jpeg');
new Pizza('Brick Oven Pizza', 'images/brickOvenPizza.jpeg');
new Pizza('Calzone', 'images/calzonePizza.jpeg');
new Pizza('Chicago Deep Dish', 'images/chicagoPizza.jpeg');
new Pizza('Chicago Pizza and Oven Grinder', 'images/cpoGinderPizza.jpeg');
new Pizza('Papa Vito\'s Thin', 'images/mwDeluxePizzaThinCrust.jpg');
new Pizza('Shot Gun Dan\'s', 'images/sgDansHtossedMeatLovPizza.jpg');


allPizzas[0].timesShown= 1;
allPizzas[1].timesShown = 1;


var totalClicks = 0;

function imageWasClicked(event){
  //track total clicks.
  totalClicks++;
  //   console.log('image was clicked');
  if(event.srcElement.id === '1'){
    allPizzas[pizzaIndex1].timesClicked++;
    // img1Clicked++;
  } else if (event.srcElement.id === '2'){
    allPizzas[pizzaIndex2].timesClicked++;
    // img2Clicked++;
  }



  //Add logic so that we dont see the same images from click to click.

  var nextPizzaIndex1 = Math.floor(Math.random() * allPizzas.length);
  while ((nextPizzaIndex1 === pizzaIndex1) || (nextPizzaIndex1 === nextPizzaIndex2) || (nextPizzaIndex1 === pizzaIndex2) ){
    nextPizzaIndex1 = Math.floor(Math.random() * allPizzas.length);
  }


  var nextPizzaIndex2 = Math.floor(Math.random() * allPizzas.length);
  while((nextPizzaIndex2 === pizzaIndex2) || (nextPizzaIndex2 === nextPizzaIndex1) || (nextPizzaIndex2 === pizzaIndex1)){
    nextPizzaIndex2 = Math.floor(Math.random() * allPizzas.length);
  }




  //Set up a ref to pizzaIndex1
  pizzaIndex1 = nextPizzaIndex1;
  pizzaIndex2 = nextPizzaIndex2;


  //Pick a random picture to display
  imageElements[0].src = allPizzas[pizzaIndex1].imageUrl;
  allPizzas[pizzaIndex1].timesShown++;
  imageElements[1].src = allPizzas[pizzaIndex2].imageUrl;
  allPizzas[pizzaIndex2].timesShown++;





  if(totalClicks >= rounds) {
    var footerElement = document.getElementsByTagName('footer')[0];
    //remove the first child the h2
    if(footerElement.firstElementChild){
      footerElement.firstElementChild.remove();
    }
    footerElement.textContent = 'You picked pizzas alot of times.';
    //create the list for votes
    var asideUl = document.getElementById('voteResults');
    for(i = 0; i < allPizzas.length; i++){
      var voteResultListItem = document.createElement('li');
      voteResultListItem.textContent = `${allPizzas[i].name} was clicked on ${allPizzas[i].timesClicked} times and shown ${allPizzas[i].timesShown}`;
      asideUl.appendChild(voteResultListItem);
      var percentageListItem = document.createElement('li');
      if(allPizzas[i].timesClicked === 0){
        var math = `Zero clicks and shown ${allPizzas[i].timesShown} times`;
      } else {
        math = Math.round(((allPizzas[i]['timesClicked'] / allPizzas[i]['timesShown']).toFixed(2) * 100)) + '%';
      }

      percentageListItem.textContent = `${allPizzas[i].name}  percentage of clicked on vs times shown is ` + math;
      asideUl.appendChild(percentageListItem);


    }


    for(var i = 0; i < imageElements.length; i++){
      imageElements[i].removeEventListener('click', imageWasClicked);
    }





  }// This closes the if(clicks vs rounds)
} // closes the images was clicked function




for(var i = 0; i < imageElements.length; i++){
  console.log('this is the event listener for the click on pizza event');
  //   debugger;
  imageElements[i].addEventListener('click', imageWasClicked);
}