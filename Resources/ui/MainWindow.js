function MainWindow(title) {
	var DetailViewWindow = require('ui/DetailViewWindow');
	var DetailEditWindow = require('ui/DetailEditWindow');
	
	var self = Ti.UI.createWindow({
		title: 'Main',
		backgroundColor: '#000000',
	});
	
	var addButton = Titanium.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.ADD
	});
	addButton.addEventListener('click', function(e) {
		var detailEditWindow = new DetailEditWindow();
		globals.tabGroup.activeTab.open(detailEditWindow);
	});
	self.rightNavButton = addButton;
	
	var tableView = Ti.UI.createTableView();
	tableView.addEventListener('click', function(e) {
		var detailViewWindow = new DetailViewWindow();
		globals.tabGroup.activeTab.open(detailViewWindow);
	});
	
	// Search data
	var tableViewRows = _getTableViewRow();
	tableView.setData(tableViewRows);
	
	self.add(tableView);
	
	return self;
};

function _getTableViewRow() {
	var data = require('model/data');
	var rows = data.select();
	
	var tableViewRows = [];
	for (var i = 0, len = rows.length; i < len; i++) {
		var jsonData = JSON.parse(rows[i]['data']);
		var tableViewRow = Ti.UI.createTableViewRow({
			title: jsonData.lastName,
		})
		tableViewRows.push(tableViewRow);
	}
	return tableViewRows;
}

module.exports = MainWindow;
