var KeyboardService = new function () {
	this.keysPressed = [];
	
	//Keyboard
	this.keyDown = function(e) {
		if(e.keyCode==39)
			this.keysPressed['right'] = true;
		if(e.keyCode==37)
			this.keysPressed['left'] = true;
		if(e.keyCode==40)
			this.keysPressed['down'] = true;
		if(e.keyCode==38)
			this.keysPressed['up'] = true;


		if(e.keyCode==68)
			this.keysPressed['right'] = true;
		if(e.keyCode==65)
			this.keysPressed['left'] = true;
		if(e.keyCode==83)
			this.keysPressed['down'] = true;
		if(e.keyCode==87)
			this.keysPressed['up'] = true;

			
			
		if(e.keyCode==32)
			this.keysPressed['space'] = true;
		
		if(e.keyCode==49)
			this.keysPressed['n1'] = true;
		if(e.keyCode==50)
			this.keysPressed['n2'] = true;
		if(e.keyCode==51)
			this.keysPressed['n3'] = true;
		if(e.keyCode==52)
			this.keysPressed['n4'] = true;		
		if(e.keyCode==53)
			this.keysPressed['n5'] = true;				
			
  	};
	  
  	this.keyUp = function(e) {
			if(e.keyCode==39)
				this.keysPressed['right'] = false;
			if(e.keyCode==37)
				this.keysPressed['left'] = false;
			if(e.keyCode==40)
				this.keysPressed['down'] = false;
			if(e.keyCode==38)
				this.keysPressed['up'] = false;

			if(e.keyCode==68)
				this.keysPressed['right'] = false;
			if(e.keyCode==65)
				this.keysPressed['left'] = false;
			if(e.keyCode==83)
				this.keysPressed['down'] = false;
			if(e.keyCode==87)
				this.keysPressed['up'] = false;


			if(e.keyCode==32)
				this.keysPressed['space'] = false;


			if(e.keyCode==49)
				this.keysPressed['n1'] = false;
			if(e.keyCode==50)
				this.keysPressed['n2'] = false;
			if(e.keyCode==51)
				this.keysPressed['n3'] = false;
			if(e.keyCode==52)
				this.keysPressed['n4'] = false;		
			if(e.keyCode==53)
				this.keysPressed['n5'] = false;

  	};
	  
	//Touch  
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


	//Create Events
	var keyUpEvent = new Event('KeyboardServiceKeyUp');
	window.addEventListener('keyup', function (e) {
		window.dispatchEvent(keyUpEvent);
		this.keyUp(e);
	}.bind(this), false);
	
	var keyDownEvent = new Event('KeyboardServiceKeyDown');
	window.addEventListener('keydown', function (e) {
		window.dispatchEvent(keyDownEvent);
		this.keyDown(e);
	}.bind(this), false);


	  
};