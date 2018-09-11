'use strict';
/* global store $, cuid, api */
//   hidding this ==>      <input class="bookmarks-app-item type="text" value="${item.title}" />
// eslint-disable-next-line no-unused-vars
const bookmarks = (function(){

  function generateItemElement(item) {
    console.log('generateItemElement is getting this ==>',item);
    let itemTitle = `<span class="bookmarks-app-item bookmarks-app-item__checked">${item.title}</span>`;
    if (!item.checked) {
      itemTitle = `
        <form id="js-edit-item">
        <center>
        <h3 class="bookmarks-app-item">${item.title}</h3>
        <div class="bookmarks-app-desc hidden"><p><span class="bookmarks-app-item"><span class="desc-list">link: </span><a href="${item.url}" target="_blank">${item.url}</a></span><p class="bookmark-desc"><span class="desc-list">Desc: </span>${item.desc}</p></div>
        <div class="bookmarks-app-rating"><p>Rating of ${item.rating} out of 5</p></div>
        </center>
        </form>
      `;
    }

    return `
      <li class="js-item-element col-6" data-item-id="${item.id}">
        ${itemTitle}
        <div class="bookmarks-app-item-controls">
        <center>
          <button class="bookmarks-app-item-toggle js-item-toggle" data-item-id="${item.id}">
            <span class="button-label">more info</span>
          </button>
          <button class="bookmarks-app-item-delete js-item-delete">
            <span class="button-label">delete</span>
          </button>
          </center>
        </div>
      </li>`;
  }
  
  
  function generateBookmarksItemsString(bookmarks) {
    const items = bookmarks.map((item) => generateItemElement(item));
    return items.join('');
  }
  
  
  function render() {
    api.getBookmarks((bookmarks) => {
      store.items = bookmarks;
      // render the bookmarks-app list in the DOM
      console.log('`render` ran');
      const bookmarksItemsString = generateBookmarksItemsString(store.items);
  
      // insert that HTML into the DOM
      $('.js-bookmarks-app').html(bookmarksItemsString);
    });
  }
  // function handleRatingAlert(){
  //   $('#js-bookmarks-rating').submit(function (event){

  //   });
  // }
  
  function handleNewItemSubmit() {
    $('#js-bookmarks-app-form').submit(function (event) {
      event.preventDefault();
       
      const newBookmark = { 
        id: cuid(),
        title: $('#js-bookmarks-title').val(),      
        url: $('#js-bookmarks-url').val(),      
        desc: $('#js-bookmarks-description').val(),
        // rating: $('#js-bookmarks-rating').val()
      };
      if($('#js-bookmarks-rating').val() &&  $('#js-bookmarks-rating').val() <= 5){
        newBookmark.rating = $('#js-bookmarks-rating').val();
      } else {
        alert('Please enter a rating number from 1 to 5!');
      }
      console.log('Rating for Bookmark ' ,newBookmark.rating);
      $('#js-bookmarks-rating').val('');
      $('#js-bookmarks-description').val('');
      $('#js-bookmarks-title').val('');
      $('#js-bookmarks-url').val('');
      if(newBookmark.title === '') {
        alert('Please enter a title');
        return false;
      } if(newBookmark.url === '') {
        alert('Please enter a url');
        return false;
      }
      api.createBookmarks(newBookmark, render);
    });
  }
  
  function toggleCheckedForListItem(id) {
    const foundItem = store.items.find(item => item.id === id);
    $(this).toggle('.bookmarks-app-desc');
  }
  
  
  function getItemIdFromElement(item) {
    return $(item)
      .closest('.js-item-element')
      .data('item-id');
  }
  
  function handleItemCheckClicked() {
    // $('.js-bookmarks-app').on('click', '.js-item-toggle', event => {
    //   event.preventDefault();
    //   console.log('this is the button',event.currentTarget);
      
    //   });
    $('.js-bookmarks-app').on('click', '.js-item-toggle', event => {
      const bookmarkId = $(event.currentTarget).attr('data-item-id');
      $(`[data-item-id=${bookmarkId}]`).find('.bookmarks-app-desc').toggleClass('hidden');
      // $(`[data-bookmark-id=${bookmarkId}]`).find(‘.js-bookmark-link’).toggleClass(‘hidden’);
    });
    //   $(‘.js-bookmark-descr’).toggleClass(‘hidden’);
    //   $(‘.js-bookmark-link’).toggleClass(‘hidden’);
    // if ($('.bookmarks-app-desc').hasClass('hidden')) {
    //   $('.bookmarks-app-desc').removeClass('hidden');
    // } else {
    //   $('.bookmarks-app-desc').addClass('hidden');
  }
    

  
  function deleteListItem(id) {
    const index = store.items.findIndex(item => item.id === id);
    store.items.splice(index, 1);
  }
  
  function editListItemName(id, itemName) {
    const item = store.items.find(item => item.id === id);
    item.name = itemName;
  }
  
  function toggleCheckedItemsFilter() {
    store.hideCheckedItems = !store.hideCheckedItems;
  }
  
  function setSearchTerm(val) {
    store.searchTerm = val;
  }
  
  
  function handleDeleteItemClicked() {
    // like in `handleItemCheckClicked`, we use event delegation
    $('.js-bookmarks-app').on('click', '.js-item-delete', event => {
      // get the index of the item in store.items
      console.log('EVENT Listaning ==> ',event);
      const id = getItemIdFromElement(event.currentTarget);
      // delete the item
      api.deleteBookmark(id, render);
      // render the updated bookmarks-app list
    });
  }
  
  function handleDetailItem() {
    // like in `handleItemCheckClicked`, we use event delegation
    $('.js-bookmarks-app').on('click', '.js-item-toggle', event => {
      // get the index of the item in store.items
      console.log('EVENT Listaning ==> ',event);
      const id = getItemIdFromElement(event.currentTarget);
      // delete the item
      api.deleteBookmark(id, render);
      // render the updated bookmarks-app list
    });
  }
  // function handleEditBookmarksItemSubmit() {
  //   $('.js-bookmarks-app').on('submit', '#js-edit-item', event => {
  //     event.preventDefault();
      
  //     const id = $(event.currentTarget).attr('data-item-id');
  //     // const itemName = $(event.currentTarget).find('.bookmarks-app-item').val();
  //     // editListItemName(id, itemName);
  //     api.deleteBookmark(id,() => {
  //       store.findAndDelete(id);
  //       render();
  //     });
  //   });
  // }
  
  function handleToggleFilterClick() {
    $('.js-filter-checked').click(() => {
      toggleCheckedItemsFilter();
      render();
    });
  }
  
  function handleBookmarksSearch() {
    $('.js-bookmarks-app-search-entry').on('keyup', event => {
      const val = $(event.currentTarget).val();
      setSearchTerm(val);
      render();
    });
  }
  
  function bindEventListeners() {
    handleNewItemSubmit();
    handleItemCheckClicked();
    handleDeleteItemClicked();
    // handleEditBookmarksItemSubmit();
    handleToggleFilterClick();
    handleBookmarksSearch();
  }

  // This object contains the only exposed methods from this module:
  return {
    render: render,
    bindEventListeners: bindEventListeners,
  };
}());
