var db = require('../middleware/dbconnect'),
	tag_table = 'tags',
	author_table = 'users';

exports.tags = function(req, res) {
	var id = parseInt(req.params.id);
	if (!isNaN(id)) {
		db.get_tags_by_post('tags', id.toString(), function (result) {
			var ans = [];
			for(var i = 0; i < result.rows.length; i++) ans.push(result.rows[i].tag);
			res.send(JSON.stringify(ans));
		});
	} else {
		res.send('[]');
	}
};

exports.author = function(req, res) {
	var username = req.params.username.replace(/'/g, "''");
	db.get_user(author_table, username, function(result) {
		var ans = result.rows[0];
		if(ans != null) delete ans.password;
		res.send(JSON.stringify(ans));
	});
};