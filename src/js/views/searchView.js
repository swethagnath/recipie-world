const base  = require('./base');
const model = require('../models/Search');

const getInput   = base.elements.searchQuery.value;

const clearInput = () => {
  base.elements.searchQuery.value = '';
};

const removeAfterSearch = () => {
  base.elements.recipieResult.innerHTML = '';
  base.elements.pagination.innerHTML    = '';
};

const highlightSearch = (id) => {
  const resultArray = Array.from(document.querySelectorAll('.common-class-list'));
  resultArray.map((el) => { el.classList.remove("hover-search-background") });
  document.querySelector(`a[href *= "${ id }"]`).classList.add("hover-search-background");
};

const checkingLimit = (title, limit = 17) => {
  if(title.length >= 17) {
    arrayWords = [];
    words = title.split(" ");
    words.reduce((acc, word) => {
      if(word.length+acc <= 17) {
        arrayWords.push(word);
      }
      return acc+word.length;
    },0);
    return `${ arrayWords.join(" ") }...`;
  }
  return title;
};

const render = (element) => {
  const markup = `<a href="#${ element.recipe_id }" class="common-class-list"><li class="media ${ element.recipe_id }">
    <img src="${ element.image_url }" class="mr-3 img-fluid" alt="..." width="100%/9">
    <div class="media-body">
    <h5 class="mt-0 mb-1">${ checkingLimit(element.title) }</h5>
    <p>${ element.publisher }</p> 
    <p>${ element.publisher_url }</p>  
    </div>
    </li></a>`
  base.elements.recipieResult.insertAdjacentHTML('beforeend', markup);
};

const renderPageButton =(page, type) => `<div id="page-button" data-goto=${ type == 'next' ? p = page+1 : p = page-1 }>
<button id=${ type }>${ type }  ${ p }</button></div>`;

const renderButton = (currentPage, totalNumberOfPages) => {
  // only next page
  let button;
  if(currentPage === 1 && totalNumberOfPages > 1){
    button = renderPageButton(currentPage, 'next');
  }
  else if(currentPage < totalNumberOfPages) {
    // both buttons 
    button = `${ renderPageButton(currentPage, 'next') }
    ${ renderPageButton(currentPage, 'prev') }`
  }
  else if(currentPage === totalNumberOfPages && totalNumberOfPages > 1) {
    // only previous page
    button = renderPageButton(currentPage, 'prev');
  }
  base.elements.pagination.insertAdjacentHTML('beforeend', button);    
};

const renderResult = (recipies, currentPage = 1, totalResultsPerPage = 10) => {
  const totalNumberOfPages = Math.ceil(recipies.length/totalResultsPerPage);
  const start              = (currentPage -1) * totalResultsPerPage;
  const end                = currentPage * totalResultsPerPage;
  recipies.slice(start, end).forEach(render);
  renderButton(currentPage, totalNumberOfPages);
};

module.exports = {
  getInput,
  renderResult,
  clearInput,
  removeAfterSearch,
  highlightSearch
};