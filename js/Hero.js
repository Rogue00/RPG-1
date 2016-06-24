var heroSprite = new Image();
heroSprite.src = "img/hero.png";

function Hero() {
	this.canvas = document.createElement('canvas');
  	this.canvas.width = 30;
  	this.canvas.height = 32;
	this.context = this.canvas.getContext('2d');
  	
	this.size = {
		w: this.canvas.width,
		h: this.canvas.height
	}
	  
  	this.needsRedraw = false;
	  
	var spritePosition = {x:0,y:0};
	  
	heroSprite.addEventListener('load',function() {
		this.needsRedraw = true;
	}.bind(this));
	
	this.getCanvas = function() {
		return this.canvas;
	}
	
	this.getPosition = function() {
		return PositionService.getPosition(this);
	}
	this.setPosition = function(x,y) {
		return PositionService.setPosition(this,x,y);
	}
	
	this.move = function(x,y) {
		var currentPosition = PositionService.getPosition(this);
		PositionService.setPosition(this,currentPosition.x+x,currentPosition.y+y);
	}
	
	this.handleHit = function(hitRects,movement) {
		for(var i=0;i<hitRects.length;i++) {
			var rect = hitRects[i].hitRect;
			var collidor = hitRects[i].collidor;
			if(collidor.obj.handleHit!=undefined) {
				collidor.obj.handleHit.call(this);
			}
			var newX = this.getPosition().x;
			var newY = this.getPosition().y;

			if(rect[2]>rect[3] && rect[3]>=0) {
				if(this.getPosition().y  < collidor.position.y) {
					newY = (collidor.position.y - this.size.h);
					movement.y=0;
				} else {
					newY = (collidor.position.y + collidor.size.h);
					movement.y=0;
				}
			}
			
			if(rect[2]<rect[3] && rect[2]>=0) {
				if(this.getPosition().x < collidor.position.x) {
					newX = (collidor.position.x - this.size.w);
					movement.x=0;
				} else {
					newX = (collidor.position.x + collidor.size.w);
					movement.x=0;
				}
			}	
			this.setPosition(newX,newY);			
		}
	}
	
	setInterval(function() {
			if(KeyboardService.keysPressed.down||KeyboardService.keysPressed.up||KeyboardService.keysPressed.left||KeyboardService.keysPressed.right) {
				if(spritePosition.x>1) spritePosition.x=-1;
				spritePosition.x+=1;
				this.needsRedraw = true;
			}
	}.bind(this),300);
	
	this.loop = function() {
		if(KeyboardService.keysPressed.down) {
			spritePosition.y = 0;
			this.needsRedraw = true;
		}
		if(KeyboardService.keysPressed.up) {
			spritePosition.y = 3;
			this.needsRedraw = true;
		}
		if(KeyboardService.keysPressed.right) {
			spritePosition.y = 2;
			this.needsRedraw = true;
		}
		if(KeyboardService.keysPressed.left) {
			spritePosition.y = 1;
			this.needsRedraw = true;
		}
	}
	
	this.draw = function() {
		if(!this.needsRedraw) return;
		this.needsRedraw = false;
		
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
		/*
		this.context.fillStyle = "red";
		this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
		*/
		this.context.drawImage(
						heroSprite,
						spritePosition.x*this.canvas.width,
						spritePosition.y*this.canvas.height,
						this.canvas.width,
						this.canvas.height,
						0,
						0,
						this.canvas.width,
						this.canvas.height
					);
	}
	
}