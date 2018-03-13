'use strict';
/* global $, bookmarks, cuid, api */

// eslint-disable-next-line no-unused-vars
console.log('store connected to HTML');

const store = (function(){
  const addBookmark = function(bookmark) {
    this.bookmarks.push(bookmark);
    console.log(this.bookmarks);
  };
  
  const findById = function(id) {
    return this.bookmarks.find(bookmark => bookmark.id === id);
  };
  const findAndDelete = function(id) {
    this.bookmarks = this.bookmarks.filter(bookmark => bookmark.id !== id);
  };  
  return {
    bookmarks: [],
    adding: false,
    condensed: false,
    rating: null,

    addBookmark,
    findById,
    findAndDelete
  };
}());



