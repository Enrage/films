document.addEventListener("DOMContentLoaded", function() {

	getFilms();

	function getFilms(searchStr = '') {
		let apiUrl = 'https://swapi.co/api/films/';
		fetch(apiUrl).then(response => response.json())
		.then((data) => {
			for (let i = 0; i < data.results.length; i++) {
				if (searchStr !== '' && searchStr !== undefined) {
					if (data.results[i].title.indexOf(searchStr) < 0) {
						continue;
					}
				}

				$('.films_list')
				.append($('<div/>', { class: 'film', id: 'film-' + i })
					.append($('<div/>', { class: 'film_img' })
						.append($('<img/>', { src: '', alt: data.results[i].title }))
					)
					.append($('<div/>', { class: 'film_desc' })
						.append($('<h2/>', { class: 'film_title', text: data.results[i].title }))
						.append($('<p/>', {class: 'film_producer', text: data.results[i].producer }))
					)
				)

				let apiPhotoUrl = 'https://pixabay.com/api/?key=13469464-412b7bcd981b5a6c95e7f09b9&q=' + data.results[i].title + '&image_type=photo';

				fetch(apiPhotoUrl).then(response => response.json())
				.then((data) => {
					let filmImgSrc;
					if (data.hits.length > 0) {
						filmImgSrc = data.hits[0].webformatURL;
					} else {
						filmImgSrc = 'http://placehold.it/260x85?text=Placeholder';
					}
					$('#film-' + i).find('img').attr('src', filmImgSrc);
				});

			}
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

});