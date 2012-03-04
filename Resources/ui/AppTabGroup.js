function AppTabGroup() {
	//declare module dependencies
	var MainWindow = require('ui/MainWindow');
	
	//create module instance
	var self = Ti.UI.createTabGroup();
	globals.tabGroup = self;
	
	var mainWindow = new MainWindow();
	var mainTab = Ti.UI.createTab({
		title: 'app',
		window: mainWindow,
	});
	self.addTab(mainTab);
	
	return self;
};

module.exports = AppTabGroup;
