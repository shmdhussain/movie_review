"use strict"


// window.showPageLoader();

/*START: Service Worker Scripts*/
if (navigator.serviceWorker) {
    navigator.serviceWorker.register('../serviceworker.js')
        .then(function(registration) {
            console.log('movie sw Success!', registration.scope);
        })
        .catch(function(error) {
            console.error('movie sw Failure!', error);
        });
}

/*END: Service Worker Scripts*/


