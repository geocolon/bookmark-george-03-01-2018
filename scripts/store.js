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

}());



