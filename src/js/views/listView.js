const base     = require('./base');

const renderItem = (item) => {
	const markup = `
		<li data-itemid=${ item.id }>
			<div class="shopping-list">
				<input type="number" value="${ item.count }" step="${ item.count }" class="list-add-width"><span>${ item.unit }</span><span>${ item.ingredient }</span>
			</div>
			<button class="delete">delete</button>
		</li>`
		base.elements.addlist.insertAdjacentHTML('afterbegin', markup);	
};

const deleteItem = (id) => {
	const item = document.querySelector(`[data-itemid="${ id }"]`);
	if(item) item.parentElement.removeChild(item)
};

module.exports = {
  renderItem,
  deleteItem
};