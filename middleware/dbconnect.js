var pg = require('pg'),
	db_url = process.env.DATABASE_URL || "postgres://postgres:lollipop11@localhost:5432/postgres";

exports.get_data = function (table, callback) {
	console.log("Gettin data from " + table + "...");
	pg.connect(db_url, function(err, client, done) {
		var handleError = function(err) {
			if(!err) return false;
			done(client);
			res.writeHead(500, {'content-type': 'text/plain'});
			res.end('An error occurred');
			return true;
		};
		
		if (!handleError) {return true};
		
		var qstring = "SELECT * FROM " + table;
		
		console.log(qstring);
		
		var query = client.query(qstring),
			cnt = 0;
		
		query.on('row', function (row, result) {
			result.addRow(row);
		});
		
		query.on('end', function(result) {
			console.log("Got " + result.rows.length + " rows when asked " + qstring);
			callback(result);
		});
		done();
	});
};


exports.send_post = function (qstring, table, callback) {
	pg.connect(db_url, function(err, client, done) {
		var handleError = function(err) {
			if(!err) return false;
			done(client);
			res.writeHead(500, {'content-type': 'text/plain'});
			res.end('An error occurred');
			return true;
		};
		
		if (handleError) {return true};
		
		var qstring = "INSERT INTO " + table + " " + qstring;
		
		console.log(qstring);
		
		var query = client.query(qstring),
			cnt = 0;
		
		query.on('row', function (row, result) {
			result.addRow(row);
		});
		
		query.on('end', function(result) {
			console.log("Done");
			callback(result);
		});
		done();
	});
};