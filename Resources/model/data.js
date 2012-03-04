var DB_NAME = 'TiPartyApp';

function setup() {
	var db = Ti.Database.open(DB_NAME);
	db.execute(
		'CREATE TABLE IF NOT EXISTS data (' +
			'id INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,' +
			'data TEXT' +
		')'
	);
	db.close();
};

function select() {
	var db = Ti.Database.open(DB_NAME);
	var rs = db.execute("SELECT * FROM data");
	
	var rows = [];
	var row;
	while (rs.isValidRow()) {
		row = {};
		for (var i = 0, len = rs.fieldCount(); i < len; i++) {
			row[rs.fieldName(i)] = rs.field(i);
		}
		rows.push(row);
		rs.next();
	}
	rs.close();
	db.close();
	return rows;
}

function insert(data) {
	var db = Ti.Database.open(DB_NAME);
	db.execute('INSERT INTO data VALUES (null, ?)', JSON.stringify(data));
	db.close();
}

exports.setup = setup;
exports.select = select;
exports.insert = insert;
