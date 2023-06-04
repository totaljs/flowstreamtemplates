require('total4');

PATH.fs.readdir('templates', function(err, response) {

	var arr = [];

	response.wait(function(filename, next) {
		PATH.fs.readFile('templates/' + filename, function(err, response) {
			response = response.toString('utf8').parseJSON(true);
			var data = {};
			data.id = response.id;
			data.group = response.group;
			data.name = response.name;
			data.url = 'https://cdn.totaljs.com/flowstream/templates/' + filename;
			data.author = response.author;
			data.icon = response.icon;
			data.color = response.color;
			data.version = response.version;
			data.reference = response.reference;
			data.readme = response.readme;
			data.dtcreated = response.dtcreated;
			arr.push(data);
			next();
		});

	}, function() {
		arr.quicksort('name');
		PATH.fs.writeFile('db.json', JSON.stringify(arr, null, '\t'), NOOP);
	});

});