const btn = document.getElementById("button_search");
const mealsContainer = document.getElementById("meal_container");
const infoCardDiv = document.getElementById("info-card-div");

btn.addEventListener("click", getMeal);
mealsContainer.addEventListener("click", showRecipe);

function getMeal() {
  let inputSearch = document.getElementById("input_search").value.trim();
  let content = "";
  fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${inputSearch}`)
    .then((response) => response.json())
    .then((data) => {
      if (data.meals) {
        console.log(data.meals);
        data.meals.forEach((meal) => {
          content += `
          <div class="container-box__card" data-id='${meal.idMeal}'>
            <img src="${meal.strMealThumb}" alt="" />
            <div class="container-box__card-info">
              <h3>${meal.strMeal}</h3>
              <button href="#" class="btn test-path">Get Recipe</button>
            </div>
          </div>
        `;
        });
      } else {
        content += `<h2 class='notFound'>Sorry, we didn't find any meal!</h2>`;
      }
      mealsContainer.innerHTML = content;
    });
}

function showRecipe(e) {
  e.preventDefault();
  if (e.target.classList.contains("test-path")) {
    let mealItem = e.target.parentElement.parentElement;
    fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealItem.dataset.id}`
    )
      .then((response) => response.json())
      .then((data) => {
        createRecipe(data.meals);
      });
  }
}

function createRecipe(meal) {
  meal = meal[0];
  let content = `
    <div class="info-card" style="background: linear-gradient(rgba(0,0,0,0.7),rgba(0,0,0,0.7)),url('${meal.strMealThumb}')">
      <h3>${meal.strMeal}</h3>
      <h4>${meal.strCategory}</h4>
      <h5>Instructions:</h5>
      <p>${meal.strInstructions}</p>
      <a href="${meal.strYoutube}" target='_blank'>Watch Video</a>
      <button type="button" class="close" onclick='removeRecipe()'>
        <i class="fas fa-times"></i>
      </button>
    </div>
  `;

  infoCardDiv.innerHTML = content;
  infoCardDiv.parentElement.classList.add("show-recepie");
  document.getElementById("cover").classList.add("opacity-cover");
}

function removeRecipe() {
  infoCardDiv.parentElement.classList.remove("show-recepie");
}
