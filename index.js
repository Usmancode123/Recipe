const searchBox = document.querySelector('.searchBox')
const Container = document.querySelector('.recipe-container')
const btn = document.querySelector('#btn')
const closeBtn = document.querySelector('.recipeCloseBtn')
const recipeDetailsContent = document.querySelector('.recipe-details-content')


const fetchData = async (value) => {
    Container.innerHTML='<h3>  Searching Recipes...</h3>'

    try{

        const data = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${value}`);
    
        const response = await data.json();
    
        Container.innerHTML=''
    
        response.meals.forEach(meal => {
            // console.log(meal)
            const cardDiv = document.createElement('div');
            cardDiv.classList.add('recipe');
            cardDiv.innerHTML=`
            <img src='${meal.strMealThumb}'> 
            <h3>${meal.strMeal}</h3>
            <p><span>${meal.strArea}</span> Dish<p/>
            <p><span>${meal.strCategory}</span> Category<p/>
            
            `
    
            const viewBtn=document.createElement('button')
            viewBtn.textContent='View Recipe'
            cardDiv.appendChild(viewBtn)
    
    
            // adding eventlistner to view recipe btn
    
            viewBtn.addEventListener('click',()=>{
                recepiePopup(meal)
            })
            Container.appendChild(cardDiv)
    
        });
    }

    catch(error){
           Container.innerHTML=' <h3>Error in  Searching Recipes...</h3>'
    }
    // console.log(response.meals);

}

// for fetchIngredients
const fetchIngredients= (meal)=>{
let IngredientsList ='';
for(let i=1;i<=20;i++){
    const ingredient =meal[`strIngredient${i}`];
    if(ingredient){
        const measure=meal[`strMeasure${i}`]
        IngredientsList += `<li>${measure} ${ingredient}</li>`
        console.log(IngredientsList);
    }
    else{
        break
    }
}
return  IngredientsList
}

const recepiePopup =(meal)=>{
    recipeDetailsContent.innerHTML=`
    <h2  class='recipeName'>${meal.strMeal} </h2>
    <h3>Ingredients:</h3>
    <ul class='indList'>${fetchIngredients(meal)}</ul>
    <div>
    <h3> Instructions :</h3>
    <p class='instructions'> ${meal.strInstructions}</p>
    </div>
    
    `
    // console.log('view');
    recipeDetailsContent.parentElement.style.display='block'
    
}


closeBtn.addEventListener('click',()=>{
    recipeDetailsContent.parentElement.style.display='none'
})
btn.addEventListener('click', (e) => {
    e.preventDefault()

    const searchInput = searchBox.value.trim()
    if(!searchInput){
        Container.innerHTML=`<h2>Type the meal in search box </h2>`
        return
    }
    fetchData(searchInput)
    // console.log('clicked');
})