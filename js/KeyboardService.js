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
	  
	return this;
})();