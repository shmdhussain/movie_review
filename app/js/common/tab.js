"use strict";

window.tabHeadEls = document.querySelectorAll('.tab_head');
window.tabContentEls = document.querySelectorAll('.tab_content');

window.tabClick = function (e) {
  var clickedTabEl = e.currentTarget;

  if (!hasClass(clickedTabEl, 'active')) {
    tabHeadEls.forEach(function (tabHeadItem) {
      removeClass(tabHeadItem, "active");
    });
    tabContentEls.forEach(function (tabContentItem) {
      removeClass(tabContentItem, "active");
    });
    var contentTabToBeActive = document.querySelector('.tab_content.' + clickedTabEl.getAttribute("data-tab-content"));
    addClass(clickedTabEl, "active");
    addClass(contentTabToBeActive, "active");
  }
};

for (var i = 0; i < tabHeadEls.length; i++) {
  window.tabHeadEls[i].addEventListener('click', tabClick);
}