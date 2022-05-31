var allFavourites=document.getElementById('allFavourites');
var input=document.getElementById('input');

// calling get function in order to show on the browser
var submit=document.getElementById("submit").addEventListener('click',getMeals);
var AllMeals=document.getElementById('meal');
var mealCollections=document.getElementById('mealCollections');
let fav=document.getElementById('fav');
let mealDetails=document.getElementById('mealDetails');
var navbar=document.getElementById('navbar');

// all meal details related to search
function getMeals(){
    let meal=input.value;
    fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${meal}`)
    .then(function(response){
        return response.json();
    })
    .then(function(data){
        console.log(data);
        var html="";
        
        data.meals.map(meal=>{
            html+=`<div id="allImg"><div class="fs-5">${meal.strMeal}</div>
            <img src="${meal.strMealThumb}" id="image"/>
            <input type="submit" value="Add favourites" id="${meal.idMeal}" onClick="favourites(${meal.idMeal})"/>
            <a href="#"
            class="showMeals" onClick="showMeal(${meal.idMeal})">view meal</a>
            <!--<p>Instructions:${meal.strInstructions}</p>-->
            </div>
            `
        });
        
        AllMeals.innerHTML=html;
    })
    
}
// when view meal button presses
function showMeal(item){
    mealDetails.style.display="block";
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item}`)
    .then(response=>{
        return response.json();})
    .then(data=>{
        mealInfo=document.getElementById('meal-info');
        console.log(data.meals[0]);
        let html=`<div class="fs-5">${data.meals[0].strMeal}</div><br>
        <img src="${data.meals[0].strMealThumb}" id="image"/>
        <p><div class="fs-5 fw-bolder">Instructions:</div>${data.meals[0].strInstructions}</p>
        `;
       mealInfo.innerHTML=html;
    })
}

// when add favourites button presses
const favourites=(item)=>{   
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${item}`)
    .then(response=>{
        return response.json();})
    .then(data=>{
        let items=document.getElementById(`${item}`);
        
        if(items.value == 'Remove favourite'){
            localStorage.removeItem(data.meals[0].strMeal);
            alert('removed from favourites!');
            items.value = 'Add favourites';
            return;
        }
        if(items.value == 'Add favourites'){
            alert('added to favourites!');
            items.value='Remove favourite';
        }
         
        html=`<div class="fs-5">${data.meals[0].strMeal}</div><br>
        <img src="${data.meals[0].strMealThumb}" id="image"/>
        <a href="#"
            class="showMeals" onClick="showMeal(${data.meals[0].idMeal})">view meal</a>
        `;
        localStorage.setItem(`${data.meals[0].strMeal}`,html)
    })
}

allFavourites.addEventListener('click',getFavourites);

// when favourites in navbar presses
function getFavourites(){
  mealDetails.style.display="none";
  fav.innerHTML=`<div class="fs-5 fw-bolder">Favourite Items</div>`;

  for(var i=0;i<localStorage.length;i++){   
      var key=localStorage.key(i);
      
      var value=localStorage.getItem(key);
      console.log(key+value);
      let div=document.createElement('div');
      div.innerHTML=`${value}
      <input type="submit" onClick="Remove('${key}')" value="Remove favourites" />
      `;
      fav.appendChild(div);

  }
}
// when remove favourite presses in favourites
function Remove(key){
    console.log(key);
localStorage.removeItem(key);
alert('remove from favourites');
}
