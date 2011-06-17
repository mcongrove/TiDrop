var TiDrop = {
	touching: false,
	position: {
		elementYStart: 0,
		elementXStart: 0,
		yStart: 0,
		xStart: 0,
		yCurrent: 0,
		xCurrent: 0
	},
	init: function(_element, _container, _callback) {
		_element.addEventListener("touchstart", function(e) { TiDrop.touchHandler(e); }, false );
		_element.addEventListener("touchmove", function(e) { TiDrop.touchHandler(e); }, false );
		_element.addEventListener("touchend", function(e) { TiDrop.touchHandler(e); }, false );
		_element.addEventListener("touchcancel", function(e) { TiDrop.touchHandler(e); }, false );

		if(_container) {
			this.container = _container;
		}

		if(_callback && typeof _callback == "function") {
			this.callback = _callback;
		} else {
			this.callback = false;
		}
	},
	touchHandler: function(_event) {
		if(_event.type == "touchstart") {
			if(!this.touching) {
				this.touching = true;
				this.element = _event.source;

				switch(Ti.UI.orientation){
					case Ti.UI.PORTRAIT:
					case Ti.UI.UPSIDE_PORTRAIT:
						this.position.elementYStart = this.element.top;
						this.position.elementXStart = this.element.left;
						break;
					case Ti.UI.LANDSCAPE_RIGHT:
					case Ti.UI.LANDSCAPE_LEFT:
						this.position.elementYStart = this.element.left;
						this.position.elementXStart = this.element.top;
						break;
				}

				this.position.yStart = parseInt(_event.globalPoint.y, 10);
				this.position.xStart = parseInt(_event.globalPoint.x, 10);
			}

		} else if(_event.type == "touchmove") {
			if(this.touching){
				this.position.yCurrent = parseInt(_event.globalPoint.y, 10);
				this.position.xCurrent = parseInt(_event.globalPoint.x, 10);

				var yDistance = this.position.yCurrent - this.position.yStart;
				var xDistance = this.position.xCurrent - this.position.xStart;

				switch(Ti.UI.orientation) {
					case Ti.UI.PORTRAIT:
						_event.source.top = this.position.elementYStart + yDistance;
						_event.source.left = this.position.elementXStart + xDistance;
						break;
					case Ti.UI.UPSIDE_PORTRAIT:
						_event.source.top = this.position.elementYStart - yDistance;
						_event.source.left = this.position.elementXStart - xDistance;
						break;
					case Ti.UI.LANDSCAPE_RIGHT:
						_event.source.left = this.position.elementYStart + yDistance;
						_event.source.top = this.position.elementXStart - xDistance;
						break;
					case Ti.UI.LANDSCAPE_LEFT:
						_event.source.left = this.position.elementYStart - yDistance;
						_event.source.top = this.position.elementXStart + xDistance;
						break;
				}
			}

		} else if(_event.type == "touchend" || _event.type == "touchcancel") {
			if(this.callback) {
				var _data = {
					source: this.element,
					position: {
						y: this.position.yCurrent,
						x: this.position.xCurrent
					},
					contained: this.withinContainer()
				};

				this.callback(_data);
			}

			this.element = null;
			this.touching = false;
			this.position = {
				elementYStart: 0,
				elementXStart: 0,
				yStart: 0,
				xStart: 0,
				yCurrent: 0,
				xCurrent: 0
			};
		} else {
			Ti.API.info("TiDrop: Not a valid touch event");
		}
	},
	withinContainer: function() {
		var contained = true;

		if(this.container) {
			if(this.element.left < this.container.left) { contained = false; }
			if(this.element.left > this.container.left + this.container.width) { contained = false; }
			if(this.element.left + this.element.width > this.container.left + this.container.width) { contained = false; }
			if(this.element.top < this.container.top) { contained = false; }
			if(this.element.top > this.container.top + this.container.height) { contained = false; }
			if(this.element.top + this.element.height > this.container.top + this.container.height) { contained = false; }
		} else {
			contained = false;
		}

		return contained;
	}
};