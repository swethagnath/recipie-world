const elements = {
	searchQuery:      document.querySelector('#query-search').value,
	searchRecipie:    document.querySelector('#search-recipie'),
	recipieResult:    document.querySelector('#recipie-result'),
	pagination:       document.querySelector('#pagination'),
	recipieContainer: document.querySelector('#recipie-search-container'),
	recipeDetails:    document.querySelector('#recipe-details'),
	addlist:          document.querySelector('.add-list'),
	addWishList:      document.querySelector('.add-wishlist'),
	wishlistToggle:  document.querySelector('.add-wishlist')
};

const elementStrings = {
  loader: 'spinner'
};

const spinner = () => {
	// const spinIcon = `<i class="fa fa-spinner fa-spin" style="font-size:90px; margin-top:60px;"></i>`
	const spinIcon = `<img src="https://img.icons8.com/dusk/64/000000/spinner-frame-2.png" class="spinner">`;
	elements.recipieResult.insertAdjacentHTML('afterbegin', spinIcon);
};

const clearSpinner = () => {
	const spinner = document.querySelector(`.${elementStrings.loader}`);
	if(spinner) {
		spinner.parentElement.removeChild(spinner);
	}
};

module.exports = {
	elements,
	spinner,
	clearSpinner,
	elementStrings
};