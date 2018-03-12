'use strict';

/* global $, getBookmarks */

// eslint-disable-next-line no-unused-vars
console.log('api connected and working!');
const api = (function (){
//Base URL
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/george';
  console.log('`api` ran');

  const getBookmarks = function(callback){
    callback('api getBookmarks module works!');
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  };

  const createBookmarks = function(title, callback){
    const newBookmark = JSON.stringify({title});

    return $.ajax({
      url : `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/JSON',
      data: newBookmark,
      success: callback
    });
  };
  const deleteBookmark = function(id, callback) {
    $.ajax({
      url: `${BASE_URL}/bookmarks/${id}`,
      method: 'DELETE',
      contentType: 'application/json',
      dataType: 'json',
      success: callback
    });
  };

  return {
    getBookmarks,
    createBookmarks
  };
})();