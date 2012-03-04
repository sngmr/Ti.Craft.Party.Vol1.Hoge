function MainWindow(title) {
	var DetailViewWindow = require('ui/DetailViewWindow');
	var DetailEditWindow = require('ui/DetailEditWindow');
	
	var self = Ti.UI.createWindow({
		tabBarHidden: true,
		barImage: 'images/bar.png',
		backgroundImage: 'images/body.png',
		barColor: '#bd83a1',
		title: 'メイン'
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
	
	self.add(tableView);
	
	self.addEventListener('focus', function(e) {
		// Search data
		var tableViewRows = _getTableViewRow();
		tableView.setData(tableViewRows);
	});
	
	return self;
};

function _getTableViewRow() {
	var data = require('model/data');
	var rows = data.select();
	
	var tableViewRows = [];
	for (var i = 0, len = rows.length; i < len; i++) {
		var jsonData = JSON.parse(rows[i]['data']);
		var tableViewRow = Ti.UI.createTableViewRow({
			height: 100,
		});
		
		var photo = Ti.UI.createView({
			backgroundImage: '/images/user.png',
			top: 5,
			left: 5,
			width:50,
			height:50,
		});
		tableViewRow.add(photo);
		
		var name = Ti.UI.createLabel({
			top: 5,
			left: 60,
			width: 200,
			height: 20,
			font:{fontSize:16,fontWeight:'bold',fontFamily:'Arial'},
			color:'#576996',
			text: jsonData.lastName + ' ' + jsonData.firstName,
		});
		tableViewRow.add(name);
		
		tableViewRows.push(tableViewRow);
	}
	
	
	return tableViewRows;
}

module.exports = MainWindow;
