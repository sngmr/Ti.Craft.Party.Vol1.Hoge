var tableView;

function DetailEditWindow(id) {
	var self = Ti.UI.createWindow({
		tabBarHidden: true,
	});
	
	var cameraButton = Titanium.UI.createButton({
		systemButton:Titanium.UI.iPhone.SystemButton.CAMERA
	});
	cameraButton.addEventListener('click', _showCamera);
	self.rightNavButton = cameraButton;
	
	// 苗字
	var tf1 = _addRow({ hintText: '苗字' });
	// 名前
	var tf2 = _addRow({ hintText: '名前' });
	// ひらがなそれぞれ
	var tf3 = _addRow({ hintText: 'みょうじ' });
	var tf4 = _addRow({ hintText: 'なまえ' });
	// 所属
	var tf5 = _addRow({ hintText: '所属' });
	// イベント日時
	var tf6 = _addRow({ hintText: '日時' });
	// イベント名
	var tf7 = _addRow({ hintText: 'イベント名' });
	
	// 保存ボタン
	var saveButton = Ti.UI.createButton({ title: '保存' });
	saveButton.addEventListener('click', _save);
	var tf8 = Ti.UI.createTableViewRow();
	tf8.add(saveButton);
	
	tableView = Ti.UI.createTableView({
		style: Titanium.UI.iPhone.TableViewStyle.GROUPED,
		data: [tf1, tf2, tf3, tf4, tf5, tf6, tf7, tf8]
	});
	self.add(tableView);
	
	return self;
}

function _addRow(args) {
	var row = Ti.UI.createTableViewRow({height:50});
	
	var tf1 = Titanium.UI.createTextField({
		color:'#336699',
		height:35,
		top:10,
		left:10,
		width:250,
		// hintText:'hint',
		borderStyle:Titanium.UI.INPUT_BORDERSTYLE_NONE
	});
	tf1.hintText = args.hintText;
	tf1.value = args.value;
	
	row.add(tf1);
	row.selectionStyle = Ti.UI.iPhone.TableViewCellSelectionStyle.NONE;
	row.className = 'control';
	return row;
}

function _save(e) {
	var data = {};
	
	var tableViewRows = tableView.data[0].rows;
	for (var i = 0, len = tableViewRows.length; i < len; i++) {
		var textField = tableViewRows[i].children[0];
		if (textField == e.source) {
			continue;
		}
		
		switch (textField.hintText) {
			case '苗字':
				data.lastName = textField.value;
				break;
			case '名前':
				data.firstName = textField.value;
				break;
			case 'みょうじ':
				data.lastNameKana = textField.value;
				break;
			case 'なまえ':
				data.firstNameKana = textField.value;
				break;
			case '所属':
				data.company = textField.value;
				break;
			case '日時':
				data.date = textField.value;
				break;
			case 'イベント名':
				data.event = textField.value;
				break;
			default:
				break;
		}
	}
	require('model/data').insert(data);
}

function _showCamera() {
	Titanium.Media.showCamera({
		success:function(event)
		{
			var image = event.media;
			
			var f = Titanium.Filesystem.getFile(Titanium.Filesystem.applicationDataDirectory, 'camera_photo.png');
			f.write(image);
			// win.backgroundImage = f.nativePath;
		},
		cancel:function()
		{
		},
		error:function(error)
		{
		},
		allowEditing:true
	});
}

module.exports = DetailEditWindow;
