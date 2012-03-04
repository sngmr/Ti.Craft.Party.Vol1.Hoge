function DetailViewWindow() {
	var self = Ti.UI.createWindow({
		tabBarHidden: true,
		barImage: 'images/bar.png',
		backgroundImage: 'images/body.png',
		titleImage: 'images/title.png',
		barColor: '#bd83a1',
	});
	
	
	self.addEventListener('focus', function(e) {
		
	});
	return self;
}

module.exports = DetailViewWindow;
