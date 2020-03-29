const base     = require('./base');

const toggleListButton = isLiked => {    
    const attr = isLiked ? 'like.png' : 'like--v2.png';
    const value = `https://img.icons8.com/plasticine/100/000000/${attr}`;
    document.querySelector('.heart').setAttribute('src', value);
};  

const toggleLikeMenu = count => {
    document.querySelector('.add-wishlist').style.visibility = count > 0 ? 'visible' : 'hidden';
};

const likeTemplate = (recipies) => {
    const rec = recipies.map((recipe) => {
       return  `<a href = #${ recipe.id }>
          <div class="card card-body">
            ${ recipe.title }
          </div>
          <button id="delete-wishlist">delete</button>
        </a>`
    });
    return rec;
};

const likeViewList = recipes => {
  const toggleRecipie = likeTemplate(recipes);
  document.querySelector('.dropdown-menu').innerHTML = toggleRecipie.join("");
};

const deleteWishlistList = (id) => {
  const a = document.querySelector(`a[href*= "${ id }"]`);
  a.parentElement.removeChild(a);
}

module.exports = {
    toggleListButton,
    toggleLikeMenu,
    likeViewList,
    deleteWishlistList
};