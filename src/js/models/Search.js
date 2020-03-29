const axios = require('axios');

class Search {
  constructor(query) {
    this.query = query;
  }

  async getRecipie() {
    try {
      const result = await axios(`https://forkify-api.herokuapp.com/api/search?q=${this.query}`);
      this.data    = result.data.recipes;
    }
    catch(error) {
      console.log(error);
    }   
  }
};

module.exports = {
  Search
};