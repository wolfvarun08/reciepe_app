const searchBox = document.querySelector('.searchBox');
const searchBtn = document.querySelector('.search-Btn');
const recipeContainer = document.querySelector('.recipe-container')
const recipeDetailsContent = document.querySelector('.recipe-details-content');

const recipeCloseBtn = document.querySelector('.recipe-close-Btn');




const fetchRecipes = async (query) => {
    recipeContainer.innerHTML = "<h2>Fetching Recipe...</h2>";
try{
    const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`)
    const response = await data.json();

    recipeContainer.innerHTML = "";

    response.meals.forEach(meal => {
        const recipeDiv = document.createElement('div');
        recipeDiv.classList.add('recipe');
        recipeDiv.innerHTML = `
    <img src="${meal.strMealThumb}">
    <h3>${meal.strMeal}</h3>
    <p><span>${meal.strArea}</span> Dish</p>    
    <p>Belongs to <span>${meal.strCategory}</span> Category</p> 

    `
        const button = document.createElement('button');
        button.textContent = 'View Recipe'
        recipeDiv.appendChild(button);

        button.addEventListener('click', () => {
            openRecipe(meal)
        })

        recipeContainer.appendChild(recipeDiv);

    });
}

catch(error){
 recipeContainer.innerHTML = "<h2>Error in fetching the Recipes , please try somethig meaningfull</h2>"
 

const imageUrl = 'chef.png'; 

const container = document.getElementById('image-container');

// 2. Create a new image element
const chefImage = document.createElement('img');

// 3. Set the 'src' (source) attribute of the image element
chefImage.src = imageUrl;



chefImage.style.maxWidth = '300px'; 
chefImage.style.height = 'auto';
chefImage.style.padding = '0px 50px';
chefImage.style.justifyContent ='center';

container.appendChild(chefImage);
}


}
const fetchIngredient = (meal) => {
    let ingredientsList = " ";
    for (let i = 1; i <= 20; i++) {
        const ingredient = meal[`strIngredient${i}`];
        if (ingredient) {

            const measure = meal[`strMeasure${i}`];
            ingredientsList += `<li>${measure} ${ingredient}</li>`
        }
        else {
            break;
        }
    }
    return ingredientsList;

}

const openRecipe = (meal) => {
    recipeDetailsContent.innerHTML = `

            <h2 class="recipeName">${meal.strMeal}</h2>
            <h3>Ingredients:</h3>
            <ul class="ingredientslist">${fetchIngredient(meal)}</ul>
            <div class="recipeInstructions">
                 <h3>Instructions :</h3>
                    <p>${meal.strInstructions}</p>
                
            </div>


        `
    recipeDetailsContent.parentElement.style.display = "block";
}

recipeCloseBtn.addEventListener('click',(e)=>{
    recipeDetailsContent.parentElement.style.display = "none";
});


searchBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const searchInput = searchBox.value.trim();
    
    if(!searchInput){
        recipeContainer.innerHTML =`<h2>Type the meal you in the search box  </h2>`;
    return
    }
    fetchRecipes(searchInput);


});
