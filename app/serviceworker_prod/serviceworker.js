
const staticCacheName = 'staticfiles';

addEventListener('install', installEvent => {
    installEvent.waitUntil(
        caches.open(staticCacheName)
        .then(staticCache => {
        	// debugger;
            // Nice to have
            staticCache.addAll([
                'fonts/subset-OpenSans-Regular.woff2',
                'fonts/subset-OpenSans-Bold.woff2',
                'fonts/subset-OpenSans-Light.woff2',
                'fonts/subset-ProzaLibre-Regular.woff2',
                'fonts/subset-ProzaLibre-Bold.woff2',
                'images/icons/baseline-feedback-24px.svg',
                'images/icons/baseline-share-24px.svg'
            ]); // end addAll
            // Must have
            return staticCache.addAll([
                'index.html',
                'data/tt0468569.json',
                'js/home.min.js',
                'css/pages/home.min.css',
                'css/common/common.min.css',
                'images/icons/baseline-more_vert-24px.svg',
                'images/placeholder_200X266.png',
                'images/placeholder_270X480.png'
            ]); // end return addAll
        }) // end open then
    ); // end waitUntil
}); // end addEventListener


addEventListener('activate', function(event) {
    console.log('The service worker is activated.');
});
// When the browser requests a file...
addEventListener('fetch', fetchEvent => {
    const request = fetchEvent.request;
    fetchEvent.respondWith(
        // First, look in the cache
        caches.match(request)
        .then(responseFromCache => {
            if (responseFromCache) {
                return responseFromCache;
            } // end if
            // Otherwise fetch from the network 
            return fetch(request);
        }) // end match then

        // fetch(request)
    ); // end respondWith
}); // end addEventListener