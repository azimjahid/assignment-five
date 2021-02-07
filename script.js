const foodCardArea = document.querySelector(".food-card-area");
const itemSearch = document.getElementById("item-search");
const searchBtn = document.getElementById("search-btn");

const itemCallByName = () => {
  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${itemSearch.value}`;
  fetch(url)
    .then((res) => res.json())
    .then((food) => {
      console.log(food);
      foodShow(food);
    });
};

// item show and validator funtion
const foodShow = (foods) => {

  if (itemSearch.value.length <= 0 || foods.meals == null) {
    foodCardArea.innerHTML = `
       <div class="alert bg-warning" role="alert">
         <h4> Sorry, there is no item with this name,"${itemSearch.value}" Please Search with another name</h4>
        </div>
       `;
    foodCardArea.classList.remove("food-card-area");
    foodCardArea.classList.add("food-card-warning");
  } else {
    allItemShow(foods)
  }
};

// item caller funtion
searchBtn.addEventListener("click", () => {
  itemCallByName();
});

const allItemShow = (data) => {
  const allFood = data.meals;
  const allFindItem = document.createElement("div");
  foodCardArea.classList.add("food-card-area");

  // for each loop for getting all card
  for (let i = 0; i < allFood.length; i++) {
    const food = allFood[i];
    const foodCard = document.createElement("div");
    foodCard.id = food.idMeal;
    foodCard.className = "food-card";
    foodCard.setAttribute("onclick", "getSelectCard(this.id)");

    foodCard.innerHTML = `
        <div class="card" >
            <img src="${food.strMealThumb}" class="card-img-top item-thum" alt="...">
            <div class="card-body">
                <h5 class="text-center"> ${food.strMeal}</h5>
            </div>
        </div>
        `;
    allFindItem.appendChild(foodCard);
  }

  foodCardArea.innerHTML = allFindItem.innerHTML;
  foodCardArea.classList.add("food-card-area");
}

const callItemById = (id) => {
  const idUrl = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`;
  fetch(idUrl)
    .then(res => res.json())
    .then(data => {
      console.log(data)
      itemDetailWindow(data);

    })
}



// Thank You