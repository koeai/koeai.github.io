$.ajax({
	type: 'GET',
	url: 'https://spreadsheets.google.com/feeds/cells/1vx5TTVcdQPZk5rIS921w4pz4zvNArOWFmREMiYOC9eg/od6/public/values?alt=json',
	dataType: 'json',
}).then(({ feed: { entry } }) => {
	const col = 5;
	const length = entry.length / 5;
	const $main = document.querySelector('main');
	for (let i = 1; i < length; i += 1) {
		const date = entry[i * col].content.$t;
		const title = entry[i * col + 1].content.$t;
		const content = entry[i * col + 2].content.$t;
		const twitter = entry[i * col + 3].content.$t;
		const src = entry[i * col + 4].content.$t;

		const $h3 = document.createElement('h3');
		$h3.innerText = date;
		$main.appendChild($h3);
		const $p = document.createElement('p');
		$p.innerText = title;
		$main.appendChild($p);

		if (content !== 'null') {
		}

		if (twitter !== 'null') {
			const $div = document.createElement('div');
			$div.innerHTML = twitter;
			$main.appendChild($div.querySelector('blockquote'));
		}

		if (src !== 'null') {
			const $img = document.createElement('img');
			$img.src = src;
			$main.appendChild($img);
		}
	}

	twttr.widgets.load();
});