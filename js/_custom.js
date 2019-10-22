document.addEventListener("DOMContentLoaded", function() {

	getFilms();

	function getFilms(searchStr = '') {
		const apiUrl = 'https://swapi.co/api/films/';
		fetch(apiUrl).then(response => response.json())
		.then((data) => {
			let html = '';
			for (let i = 0; i < data.results.length; i++) {
				if (searchStr !== '' && searchStr !== undefined) {
					if (data.results[i].title.toLowerCase().indexOf(searchStr.toLowerCase()) < 0) {
						continue;
					}
				}

				html += `<div class="film" id="film-${i}">
						<div class="film_img">
							<img src="http://placehold.it/260x85?text=Placeholder" alt="${data.results[i].title}">
						</div>
						<div class="film_desc">
							<h2 class="film_title">${data.results[i].title}</h2>
							<p class="film_producer">${data.results[i].producer}</p>
						</div>
					</div>`;

				let apiPhotoUrl = `https://pixabay.com/api/?key=13469464-412b7bcd981b5a6c95e7f09b9&q=${data.results[i].title}&image_type=photo`;

				fetch(apiPhotoUrl).then(response => response.json())
				.then((data) => {
					let filmImgSrc;
					if (data.hits.length > 0) {
						filmImgSrc = data.hits[0].webformatURL;
					} else {
						filmImgSrc = 'http://placehold.it/260x85?text=Placeholder';
					}

					document.querySelector(`#film-${i} img`).setAttribute('src', filmImgSrc);
				});

			}

			document.querySelector('.films_list').innerHTML = html;
		});
	}

	let searchBtn = document.querySelector('.search_btn');
	if (searchBtn) {
		searchBtn.onclick = function(e) {
			e.preventDefault();
			let searchStr = document.querySelector('#film_input').value;
			$('.films_list .film').fadeOut(200);
			setTimeout(() => $('.films_list').empty(), 200);
			getFilms(searchStr);
		}
	}

	$('#film_input').keypress(function(e) {
		if (e.which == 13) {
			e.preventDefault();
			return false;
		}
	});

});