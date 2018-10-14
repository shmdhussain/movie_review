"use strict"


window.showPageLoader();

/*START: Service Worker Scripts*/
if (navigator.serviceWorker) {
    navigator.serviceWorker.register('/serviceworkers/movies/serviceworker.js')
        .then(function(registration) {
            console.log('movie sw Success!', registration.scope);
        })
        .catch(function(error) {
            console.error('movie sw Failure!', error);
        });
}

/*END: Service Worker Scripts*/


window.fetchJsonData("/data/tt0468569.json").then(function (data) {
	console.log("Movie Data fetch success");
	window.showPageLoader();
	console.log(data);

}).catch(function(error) {
	console.error("Error in Fetching the Movie Data");
	console.error(error);
	return "Error Handled";
}).then(function (data) {
	
	window.hidePageLoader();


})