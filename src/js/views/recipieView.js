const base     = require('./base');
const Fraction = require('fractional').Fraction;

const convertFraction = (integer) => {
  if(integer) {
    const [int, dec] = integer.toString().split(".").map((el) => parseInt(el)); 
    if (!dec) return int
    if(int === 0) {
      const fr = new Fraction(dec);
      return `${fr.numerator}/${fr.denominator}`
    }else {
      const fr = new Fraction(integer-int);
      return `${int} ${fr.numerator}/${fr.denominator}`
    }
  }
  return '?';
};  

const renderIngredients = (element) => {
  return element.map((el) => {
    return `<li><span class="count-ing">${ convertFraction(el.count) }</span>${ el.ingredient }</li>`;
  });
};

const clearRecipie = (recipie) => {
  recipie.innerHTML = "";
};

const renderRecipe = (element, isliked) => {
  console.log(isliked);
  const template =  `
    <h1>${ element.title }</h1>
    <img src=${ element.image } class="cover-image">
    <div class="serving">
      <button class='increase'>
        <i class='fas fa-plus' style='font-size:10px;color:maroon'></i>
      </button>
      <span class="serv-modify">Servings ${ element.servings }</span>
      <button class='decrease'>
        <i class='fas fa-minus' style='font-size:10px;color:maroon'></i>
      </button>
        <img src="https://img.icons8.com/plasticine/100/000000/${ isliked ? 'like.png' : 'like--v2.png' }" class ="heart">
    </div>
    <ul>
      ${ renderIngredients(element.ingredients).join('') }
    </ul>
    <div class="add-list-button-text">
      <button id="add-to-list">Add to the List</button>
    </div>`;
    
  base.elements.recipeDetails.insertAdjacentHTML('afterbegin', template);
};

const renderRecipeElements = (recipie, isliked) => {
  renderRecipe(recipie, isliked);
};

const updateRecipie = (recipie) => {
  document.querySelector('.serv-modify').textContent = `Servings ${ recipie.servings }`;
  const arrayElements = Array.from(document.querySelectorAll('.count-ing'));
  arrayElements.forEach((el, index)=> {
    el.textContent = convertFraction(recipie.ingredients[index].count);
  });
};

module.exports = {
  renderRecipeElements,
  clearRecipie,
  updateRecipie 
};