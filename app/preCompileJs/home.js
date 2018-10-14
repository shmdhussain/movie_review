


window.showPageLoader();

/*START: Service Worker Scripts*/
if (navigator.serviceWorker) {
    navigator.serviceWorker.register('serviceworker.js')
        .then(function(registration) {
            console.log('movie sw Success!', registration.scope);
        })
        .catch(function(error) {
            console.error('movie sw Failure!', error);
        });
}

/*END: Service Worker Scripts*/


window.fetchJsonData("data/tt0468569.json").then(function (data) {
	console.log("Movie Data fetch success");
	
	console.log(data);


	/*START: fill the header data*/
	var headEl= document.querySelector('.header_text h1');
	headEl.innerHTML = data.Title;
	document.querySelector('.mv_duration').innerHTML = data.RuntimeFormatted;
	document.querySelector('.mv_theme').innerHTML = data.Genre;
	document.querySelector('.mv_yr').innerHTML = data.Year;
	document.title = data.Title + 'Movie Review';
	/*END: fill the header data*/


	/*START: Overview Data Fill*/
	
	
	/*START: Fill Ratings data*/
	var fillRatingsTmplItem = function (data) {
		var ratingsTmpl = `<div class="mv_ratings_item">
			                <div class="mv_ratings_prov">
			                  <a href="#">${data.Source}</a>
			                </div>
			                <div class="mv_ratings_score">
			                  ${data.Value}
			                </div>
			              </div>`;
		return ratingsTmpl;

	}
	
	var ratingsHTML = ``;
	for (var i = 0; i < data.Ratings.length; i++) {
		var temp = fillRatingsTmplItem(data.Ratings[i]);
		ratingsHTML += temp;
 	}

 	document.querySelector('.mv_ratings_cont ').innerHTML = ratingsHTML;
    
	/*END: Fill Ratings data*/


	/*START: Fill overview */
	document.querySelector('.mv_overview_text').innerHTML= data.Plot;
	/*END: Fill overview */

	/*START: Fill Director Name*/
	document.querySelector('.dir_name + p a').innerHTML = data.Director;
	/*END: Fill Director Name*/

	/*START: Fill Cast*/
	document.querySelector('.mv_cast_text').innerHTML = data.Actors;
	/*END: Fill Cast*/


	/*START: Fill Slider Images*/
	

     var fillImagesliderTmplItem = function (data, movieImageBaseUrl) {
		var imageSliderItemTmpl = `<div>
			                <img src="images/placeholder_270X480.png" alt="ff" class="placeholder_img_9_16">
			                <picture>
			                  <source type="image/webp" srcset="${movieImageBaseUrl}/webp/${data.imageUrl}.webp"> 
			                  <img src="${movieImageBaseUrl + data.imageUrl}.jpg" alt="${data.caption}" class="mv_slider_img">
			                </picture>
			              </div>`;
		// console.log(imageSliderItemTmpl);
		return imageSliderItemTmpl;

	}
	
	var imageSliderHTML = ``;
	for (var i = 0; i < data.movieImages.length; i++) {
		var temp = fillImagesliderTmplItem(data.movieImages[i], data.movieImageBaseUrl);
		imageSliderHTML += temp;
 	}

 	document.querySelector('.mv_slider').innerHTML = imageSliderHTML;
    
	/*END: Fill Slider Images*/

	/*END: Overview Data Fill*/

	/*START: Cast Detail Tab Fill Data*/
	
	/*START:Fill Cast Detail Tab Item*/
	

     var fillCastDetailTmplItem = function (data, castImagesBaseUrl) {
		var castDetailItemTmpl = `<a href="castDetail/${data.imageUrlName}.html" class="cast_item">
						            <div class="cast_media">
						                <div class="cast_media_inner">
							              <img src="images/placeholder_200X266.png" alt="${data.imageUrlName}" class="placeholder_img_3_4 mv_cast_placeholder_img">
							              <picture>
							                <source type="image/webp" srcset="${castImagesBaseUrl}/webp/${data.imageUrlName}.webp"> 
							                <img src="${castImagesBaseUrl + data.imageUrlName}.jpg" alt="${data.imageUrlName}" class="mv_cast_img">
							              </picture>
						            	</div>
						            </div>

						            <div class="cast_info">
						              <h3 class="cast_name">${data.name}</h3>
						              <h4 class="cast_char_name">${data.characterName}</h4>
						            </div>

						          </a>`;
		// console.log(castDetailItemTmpl);
		return castDetailItemTmpl;

	}
	
	var castDetailHTML = ``;
	for (var i = 0; i < data.cast.length; i++) {
		var temp = fillCastDetailTmplItem(data.cast[i], data.castImagesBaseUrl);
		castDetailHTML += temp;
 	}

 	document.querySelector('.cast_cont').innerHTML = castDetailHTML;
    
	/*END: Fill Slider Images*/
	

	/*END: Cast Detail Tab Fill Data*/
	window.hidePageLoader();
}).catch(function(error) {
	console.error("Error in Fetching the Movie Data");
	console.error(error);
	return "Error Handled";
}).then(function (data) {
	
	window.hidePageLoader();


});

