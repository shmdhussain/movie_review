"use strict";

window.text = "hello ".concat(6 + 6);
console.log(window.text);
/**
 * START:Pure JS Function to check element has class w/o jQuery
 */

window.hasClass = function (el, className) {
  return el.classList ? el.classList.contains(className) : new RegExp('\\b' + className + '\\b').test(el.className);
};
/*END: Pure JS Function to check element has class w/o jQuery*/

/**
 * START:Pure JS Function to add class w/o jQuery
 */


window.addClass = function (el, className) {
  if (el.classList) {
    el.classList.add(className);
  } else if (!hasClass(el, className)) {
    el.className += ' ' + className;
  }
};
/**
 * START:Pure JS Function to remove class w/o jQuery
 */


window.removeClass = function (el, className) {
  if (el.classList) el.classList.remove(className);else el.className = el.className.replace(new RegExp('\\b' + className + '\\b', 'g'), '');
};
/*END: Pure JS Function to add class w/o jQuery*/

/*START: show/hide Page Laoder*/


window.pageLoaderEl = document.querySelector('.page_loader');

window.showPageLoader = function () {
  window.pageLoaderEl.style.display = "block";
};

window.hidePageLoader = function () {
  window.pageLoaderEl.style.display = "none";
};
/*END: show/hide Page Laoder*/

/*START: Fetch JSON Data from url and return promise with data*/


window.status = function (response) {
  if (response.status >= 200 && response.status < 300) {
    return Promise.resolve(response);
  } else {
    return Promise.reject(new Error(response.statusText));
  }
};

window.json = function json(response) {
  return response.json();
};

window.fetchJsonData = function fetchJsonData(dataUrl) {
  return fetch(dataUrl).then(status).then(json);
};
/*END: Fetch JSON Data from url and return promise with data*/