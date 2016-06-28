var KeyboardService = new function () {
	this.keysPressed = [];
	
	window.addEventListener('keydown' , function(e) {
		if(e.keyCode==39)
			this.keysPressed['right'] = true;
		if(e.keyCode==37)
			this.keysPressed['left'] = true;
		if(e.keyCode==40)
			this.keysPressed['down'] = true;
		if(e.keyCode==38)
			this.keysPressed['up'] = true;
		if(e.keyCode==32)
			this.keysPressed['space'] = true;
  	}.bind(this));
	  
  	window.addEventListener('keyup' , function(e) {
			if(e.keyCode==39)
				this.keysPressed['right'] = false;
			if(e.keyCode==37)
				this.keysPressed['left'] = false;
			if(e.keyCode==40)
				this.keysPressed['down'] = false;
			if(e.keyCode==38)
				this.keysPressed['up'] = false;
			if(e.keyCode==32)
				this.keysPressed['space'] = false;

  	}.bind(this));
	window.addEventListener('load', function() {
		document.body.addEventListener('touchstart' , function(e) {
			if(e.changedTouches[0].clientX>document.body.clientWidth-100) {
				this.keysPressed['right'] = true;
			}
			
			if(e.changedTouches[0].clientX<100) {
				this.keysPressed['left'] = true;
			}
			
			if(e.changedTouches[0].clientY>document.body.clientHeight-100) {
				this.keysPressed['down'] = true;
			}
			
			if(e.changedTouches[0].clientY<100) {
				this.keysPressed['up'] = true;
			}
			
	
		}.bind(this));

		document.body.addEventListener('touchend' , function(e) {
			this.keysPressed['right'] = false;
			this.keysPressed['left'] = false;
			this.keysPressed['down'] = false;
			this.keysPressed['up'] = false;		
		}.bind(this));
	}.bind(this));

	var keyUpEvent = new Event('KeyboardServiceKeyUp');
	window.addEventListener('keyup', function (e) {
		window.dispatchEvent(keyUpEvent);		
	}, false);
	
	var keyDownEvent = new Event('KeyboardServiceKeyDown');
	window.addEventListener('keydown', function (e) {
		window.dispatchEvent(keyDownEvent);		
	}, false);


	  
};