const axios = require('axios');

class Recipie {
  constructor(id){
    this.id = id;
  };

  async  getrecipie() {
    try{
      const result       = await axios(`https://forkify-api.herokuapp.com/api/get?rId=${this.id}`);
      this.title         = result.data.recipe.title;
      this.publisher     = result.data.recipe.publisher;
      this.ingredients   = result.data.recipe.ingredients;
      this.image         = result.data.recipe.image_url;
      this.publisher_url = result.data.recipe.publisher_url;
      this.social_rank   = result.data.recipe.social_rank;
    }catch(error){
      console.log(error);
    }
  };

  parseIngredients() {
    const longUrl  = ['tablespoons', 'tablespoon', 'ounces', 'ounce', 'teaspoons', 'teaspoon', 'cups', 'pounds']; 
    const shortUrl = ['tbsp', 'tbsp', 'oz', 'oz', 'tsp', 'tsp', 'cup', 'pound'];
    let newIngredients = this.ingredients.map(element => {
      let ingredient = element.toLowerCase();

      longUrl.forEach((el, i) => {
        ingredient = ingredient.replace(el, shortUrl[i]);
      });

      ingredient = ingredient.replace(/[()]/g, '');
      const recipieSplit = ingredient.split(" ");
      
      const unitIndex    = recipieSplit.findIndex(element => shortUrl.includes(element));
      
      let obj;
      // 1. 1/2 1 cup 
      // 2. 1-1/2 cup
      if(unitIndex > -1) {
        const args = recipieSplit.slice(0, unitIndex)
        
        if(args.length == 1){this.getrecipie
          obj = {
            count: eval(args[0].replace('-','+')),
            unit:  '',
            ingredient: recipieSplit.slice(1).join(' ')
          }
        }else {
          console.log(ingredient);
          obj = {
            count: eval(recipieSplit.slice(0,unitIndex).join('+')),
            unit:  '',
            ingredient: recipieSplit.slice(unitIndex).join(' ')
          }
        }
      }else if(parseInt(recipieSplit[0])) {   //if there is no unit but integer is present
        obj = {
          count: parseInt(recipieSplit[0]),
          unit:  '',
          ingredient: recipieSplit.slice(1).join(' ')
        }
      }else if(unitIndex === -1) {
        obj = {
          count: 1,
          unit:  '',
          ingredient
        }
      }
      return obj;
    });  
    this.ingredients =  newIngredients;  
  };

  calcServings() {
    this.servings = 4;
  };

  updateServings(type) {
    const newServings = type === 'increase' ? this.servings+1 : this.servings-1;
    this.ingredients.forEach((el) => {
      el.count *= newServings/this.servings;
    });
    this.servings = newServings;
  };

};

module.exports = {
  Recipie
};