Demo
====

http://screencast.com/t/uQO2t5Lg6

Example
=======

	Ti.include("TiDrop.js");
	
	var tabGroup = Ti.UI.createTabGroup();
	
	var window = Ti.UI.createWindow({  
	    title: "Drag + Drop",
	    backgroundColor: "#FFF"
	});
	
	var tab = Ti.UI.createTab({  
	    title: "Drag + Drop",
	    window: window
	});
	
	var box1 = Ti.UI.createView({
		width: 100,
		height: 100,
		top: 10,
		left: 10,
		backgroundColor: "#7A0000"
	});
	
	var box2 = Ti.UI.createView({
		width: 100,
		height: 100,
		top: 10,
		left: 120,
		backgroundColor: "#007A00"
	});
	
	var container1 = Ti.UI.createView({
		width: 300,
		height: 120,
		top: 237,
		left: 10,
		backgroundColor: "#CCC",
		items: 0
	});
	
	function yay(e) {
		if(e.contained) {
			e.source.top = 247;
			e.source.left = 20;
		}
	}
	
	TiDrop.init(box1, container1, yay);
	TiDrop.init(box2, container1, yay);
	
	window.add(container1);
	window.add(box1);
	window.add(box2);
	
	tabGroup.addTab(tab);  
	tabGroup.open();