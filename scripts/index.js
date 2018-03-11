'use strict';
/* global $, bookmarks, cuid, api */

// eslint-disable-next-line no-unused-vars

$(document).ready(function() {
  bookmarks.bindEventListeners();
  bookmarks.render();


  api.getBookmarks((bookmarks) => {
    bookmarks.forEach(function(bookmark) { 
      return store.addBookmark(bookmark); 
    });
    const newBookmark = store.bookmarks[0];
    bookmarks.render();
  });
});
