'use strict';
/* global $, bookmarks, cuid, api, items, store */

// eslint-disable-next-line no-unused-vars

$(document).ready(function() {


  api.getBookmarks((items) => {
    items.forEach((bookmark) => store.addBookmark(bookmark));
    // const newBookmark = store.bookmarks[0];
    bookmarks.render();
  
  });
  bookmarks.bindEventListeners();
  bookmarks.render();
});
