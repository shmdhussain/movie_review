



window.moreMenuClick = function (e) {
	var moreMenuEl = e.currentTarget;
	if(!hasClass(moreMenuEl, 'open')){
		addClass(moreMenuEl, 'open');
	}else{
		removeClass(moreMenuEl, 'open');
	}
}

window.moreMenuEl    = document.querySelector('.header_more');

window.moreMenuEl.addEventListener('click', window.moreMenuClick);








