var dog,sadDog,happyDog,database,foods,foodStock,fedTime,lastFed,feed,addFood,foodObj


function preload(){
  sadDog=loadImage("Images/Dog.png");
  happyDog=loadImage("Images/happy dog.png");

}

function setup() {
  database = firebase.database()
  createCanvas(1000,400);
  foodObj =new Food ()
  foodStock=database.ref('Food')
  foodStock.on("value",readStock)

  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

 feed= createButton("feedTheDog")
 feed.position(700,95)
 feed.mousePressed(feedDog)
 
 addFood=createButton("addFood")
 addFood.position(800,95)
 addFood.mousePressed(addFoods)
}

function draw() {
  background(46,139,87);
 foodObj.display()
 fedTime= database.ref('FeedTime')
 fedTime.on("value",function(data){
   lastFed = data.val()
 })
 fill("yellow")
 textSize(15)
 if(lastFed>=12){
   text("lastFed: "+lastFed%12+"pm",350,30)

 }
else if(lastFed==0){
  text("lastFed: 12am",350,30)
}
else{
  text("lastFed: "+lastFed+"am",350,30)
}
  drawSprites();
}

//function to read food Stock
function readStock (data){
  foods = data.val()
  foodObj.updateFoodStock(foods)
  
}
function feedDog(){
  dog.addImage(happyDog)
  if(foodObj.getFoodStock()<=0){
    foodObj.updateFoodStock(foodObj.getFoodStock()*0)
  }
  else{
    foodObj.updateFoodStock(foodObj.getFoodStock()-1)
  }
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    feedTime:hour()
  })
}
//function to update food stock and last fed time
function addFoods(){
  foods++
  database.ref('/').update({
    Food:foods
  })
}

//function to add food in stock

