'use strict';

/* global $, getBookmarks */

// eslint-disable-next-line no-unused-vars
console.log('api connected and working!');
const api = (function (){
//Base URL
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/george';
  console.log('`api` ran');

  const getBookmarks = function(callback){
    callback('api module works!');
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  };

  const createBookmarks = function(title, url, desc, rating, callback){
    const newBookmark = JSON.stringify({title, url, desc, rating});
    
    
    $.ajax({
      url : `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/JSON',
      data: newBookmark,
      success: callback
    });
  };

  return {
    getBookmarks,
    createBookmarks
  };
})();