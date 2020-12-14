//Create variables here
var dog, happyDog, database,foodStock, dogImage, dogSound, House, FoodImage, Food;
var foodS = 100;
var fedTime,lastFed;
var feed,addFood;
var foodObj;
function preload()
{
  //load images here
  dogImage = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png");
  //House= loadImage("images/House.jpg");
  //FoodImage = loadImage("images/milk.jpg");
  //dogSound = loadSound("images/dogSound.mp3");
}

function setup() {
	createCanvas(1000, 400);
  database = firebase.database();

  foodObj = new Food();

  feed=createButton("Feed the dog");
  feed.position(700,95);
  feed.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

dogHouse = createSprite(400,325);
//dogHouse.addImage("dogHouse",House);
dogHouse.scale = 1.4;

dog = createSprite(750,250,10,10);
dog.addImage("dog", dogImage);
dog.scale = 0.15;

foodStock=database.ref('Food');
foodStock.on("value",readStock);
}


function draw() {  
  background(46,139,87);
  foodObj.display();

  fedTime=database.ref("FeedTime");
  fedTime.on("value", function(data){
    lastFed=data.val();
  })
  
  if(foodS == 0){
  dog.visible=true;
  foodS = 20;
}

fill(255,255,254);
textSize(15);
if(lastFed>=12){
  text("Last Feed : "+ lastFed%12 + "PM", 350,30);
}  else if(lastFed==0){
  text("Last Feed : 12 AM", 350,30);
}else{
  text("Last Feed : "+ lastFed + "AM", 350,30);
}
  drawSprites();
}


function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}



