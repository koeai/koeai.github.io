$.ajax({
	type: 'GET',
	url: 'https://spreadsheets.google.com/feeds/cells/1wkCKucV8zwf61hlm0S3ikx_LUmYgBcEmh0WgMhUJSeo/od6/public/values?alt=json',
	dataType: 'json',
}).then(({ feed: { entry } }) => {
	const length = entry.length / 4;
	const $news = document.querySelector('.news');
	for (let i = 1; i < length; i += 1) {
		const $li = document.createElement('li');
		const date = entry[i * 4].content.$t;
		const title = entry[i * 4 + 1].content.$t;
		const content = entry[i * 4 + 2].content.$t;
		const url = entry[i * 4 + 3].content.$t;

		$li.appendChild(document.createTextNode(date));
		$li.appendChild(document.createTextNode(` ${title}`));
		$li.appendChild(document.createElement('br'));
		if (content !== 'null') {
			if (url === 'null') {
				$li.appendChild(document.createTextNode(content));
			} else {
				const $a = document.createElement('a');
				$a.innerText = content;
				$a.href = url;
				$li.appendChild($a);
			}
		}
		
		$news.appendChild($li);
	}
});