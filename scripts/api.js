'use strict';

/* global $, getBookmarks */

// eslint-disable-next-line no-unused-vars
console.log('api connected and working!');
const api = (function (){
//Base URL
  const BASE_URL = 'https://thinkful-list-api.herokuapp.com/george';
  console.log('`api` ran');

  const getBookmarks = function(callback){
    console.log('api getBookmarks module works!');
    $.getJSON(`${BASE_URL}/bookmarks`, callback);
  };

  const createBookmarks = function(bookmark, callback){

    $.ajax({
      url : `${BASE_URL}/bookmarks`,
      method: 'POST',
      contentType: 'application/JSON',
      data: JSON.stringify(bookmark),
      success: callback
    });
    console.log('createBookmark successfully ran');
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
    createBookmarks,
    deleteBookmark
  };
})();