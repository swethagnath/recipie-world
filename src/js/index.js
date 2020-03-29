const model       = require('./models/Search');
const recipie     = require('./models/Recipie');
const base        = require('./views/base');
const view        = require('./views/searchView');
const recipieView = require('./views/recipieView');
const list        = require('./models/List');
const listView    = require('./views/listView');
const like        = require('./models/like');
const likeView    = require('./views/likeView');

const state = {};

const controlSearch = async () => {
  const query = document.querySelector('#query-search').value; //modify
  document.querySelector('#query-search').value = ''; //modify
  view.removeAfterSearch();
  state.search = new model.Search(query); 
  base.spinner(state.search);
  await state.search.getRecipie();
  base.clearSpinner();
  view.renderResult(state.search.data);
};

base.elements.searchRecipie.addEventListener('submit', (e)=> {
  e.preventDefault();
  controlSearch();
});

base.elements.recipieContainer.addEventListener('click', e => {
  const goto = parseInt(e.target.closest('#page-button').dataset.goto);
  view.removeAfterSearch();
  view.renderResult(state.search.data, goto);
});

const controlRecipie = async () => {
  const id = window.location.hash.replace('#', '');
  state.rec = new recipie.Recipie(id);
  recipieView.clearRecipie(base.elements.recipeDetails);
  if(id){
    view.highlightSearch(id);
    try{
      await state.rec.getrecipie();
      state.rec.parseIngredients();           
      state.rec.calcServings();
      if(!state.like) state.like = new like.Like();
      recipieView.renderRecipeElements(state.rec, state.like.isliked(id));
    }
    catch(error){
      console.log(error);
    }
  }  
};

['load', 'hashchange'].forEach((event) => {
  window.addEventListener(event, controlRecipie);
});

const controlList = () => {
	if(!state.list) state.list = new list.List();
    state.rec.ingredients.forEach((element) => {
      const item = state.list.addItem(element.count, element.unit, element.ingredient);
      listView.renderItem(item);
    });
};

const controlLike = () => {
	if(!state.like) state.like = new like.Like();
    if(!state.like.isliked(state.rec.id)) {
      likeView.toggleListButton(true);
      const item = state.like.addLike(state.rec.id, 
        state.rec.title, 
        state.rec.publisher, 
        state.rec.image
      );
      likeView.likeViewList(state.like.likes);
    }else {
      likeView.toggleListButton(false);
      state.like.deleteLike(state.rec.id); 
      likeView.deleteWishlistList(state.rec.id);
    };
};

if(!state.like) state.like = new like.Like();
likeView.toggleLikeMenu(state.like.getNumLikes());

base.elements.recipeDetails.addEventListener('click', (e) => {
    if(e.target.closest('.increase, .increase *')) {
      state.rec.updateServings('increase');
      recipieView.updateRecipie(state.rec);
    }else if(e.target.closest('.decrease, .decrease *')) {
      state.rec.updateServings('decrease');
      recipieView.updateRecipie(state.rec);
    }else if(e.target.closest('#add-to-list')) {
      controlList();
    }else if(e.target.closest('.heart')) {
      controlLike();
      likeView.toggleLikeMenu(state.like.getNumLikes());
    }
});

base.elements.addlist.addEventListener('click', (e) => {
    const id = e.target.closest('li').dataset.itemid;
    if(e.target.matches('.delete')) {
      state.list.deleteItem(id);
      listView.deleteItem(id);
    }else if(e.target.matches('.list-add-width')) {
      const newCount = parseFloat(e.target.value);
      state.list.updateCount(id, newCount);
      console.log(state.list);
    };
});

window.addEventListener('load', () => {
    //read value from storage and assign it to the state object
  state.like = new like.Like(); 
  state.like.readStorage(); 
  likeView.toggleLikeMenu(state.like.getNumLikes());
  likeView.likeViewList(state.like.likes);
});
 
