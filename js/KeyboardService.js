var KeyboardService = (function () {
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
	
	window.addEventListener('touchstart' , function(e) {
		if(e.clientX>document.body.clientWidth/2) {
			this.keysPressed['right'] = true;
		} else {
			this.keysPressed['left'] = true;
		}
		if(e.clientY>document.body.clientHeight/2) {
			this.keysPressed['down'] = true;
		} else {
			this.keysPressed['up'] = true;
		}

	});

	window.addEventListener('touchend' , function(e) {
		this.keysPressed['right'] = false;
		this.keysPressed['left'] = false;
		this.keysPressed['down'] = false;
		this.keysPressed['up'] = false;		
	});

	  
	return this;
})();