class Like {
  constructor() {
    this.likes = [];
  };

  addLike(id, title, author, img) {
    const like = {
      id,
      title,
      author,
      img
    };
    this.likes.push(like);
    this.persistedLikes();
    return like;
  };

  deleteLike(id) {
    const index = this.likes.findIndex(el => el.id === id);
    this.likes.splice(index, 1);
  };

  isliked(value) {
    return this.likes.findIndex((el => el.id === value)) !== -1;
  };

  getNumLikes() {
    return this.likes.length;
  };

  persistedLikes() {
    localStorage.setItem('likes', JSON.stringify(this.likes));
  };

  readStorage() {
    const storage = JSON.parse(localStorage.getItem('likes'));
    if(storage) this.likes = storage
  };
};

module.exports = {
  Like
};