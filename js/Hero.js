Hero.prototype = Object.create(Drawable.prototype);
Hero.prototype.constructor = Drawable;
	
function Hero(x,y) {
	Drawable.call(this,x,y,30,32);

	var heroSprite = new Image();
	heroSprite.src = "img/hero.png";
	  
	heroSprite.addEventListener('load',function() {
		this.needsRedraw = true;
	}.bind(this));
	
	
	
	this.handleHit = function(hitRects,movement) {
		for(var i=0;i<hitRects.length;i++) {
			var rect = hitRects[i].hitRect;
			var collidor = hitRects[i].collidor;
			

			
			if(collidor.obj.handleHit!=undefined) {
				collidor.obj.handleHit(this);
			}
			
			if(collidor.obj.hits===false) {
				continue;
			}
			
			var newX = this.position.x;
			var newY = this.position.y;

			if(rect[2]>rect[3] && rect[3]>=0) {
				if(this.position.y  < collidor.position.y) {
					newY = (collidor.position.y - this.size.h);
					movement.y=0;
				} else {
					newY = (collidor.position.y + collidor.size.h);
					movement.y=0;
				}
			}
			
			if(rect[2]<rect[3] && rect[2]>=0) {
				if(this.position.x < collidor.position.x) {
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
	
	this.userLoop = function() {
		if(KeyboardService.keysPressed.down) {
			this.spritePosition.y = 0;
			this.needsRedraw = true;
		}
		if(KeyboardService.keysPressed.up) {
			this.spritePosition.y = 3;
			this.needsRedraw = true;
		}
		if(KeyboardService.keysPressed.right) {
			this.spritePosition.y = 2;
			this.needsRedraw = true;
		}
		if(KeyboardService.keysPressed.left) {
			this.spritePosition.y = 1;
			this.needsRedraw = true;
		}
	}
	
	this.userDraw = function() {
		this.context.drawImage(
						heroSprite,
						this.spritePosition.x*this.canvas.width,
						this.spritePosition.y*this.canvas.height,
						this.canvas.width,
						this.canvas.height,
						0,
						0,
						this.canvas.width,
						this.canvas.height
					);
	}

	this.shiftHeroAnimation = function() {
		if(this.spritePosition.x>1) this.spritePosition.x=-1;
		this.spritePosition.x+=1;
		this.needsRedraw = true;
	}
	
	setInterval(function() {
		if(KeyboardService.keysPressed.down||KeyboardService.keysPressed.up||KeyboardService.keysPressed.left||KeyboardService.keysPressed.right) {
			this.shiftHeroAnimation();
		}		
	}.bind(this),350);
	
	window.addEventListener('KeyboardServiceKeyUp', function() {
		if(KeyboardService.keysPressed.left||KeyboardService.keysPressed.right||KeyboardService.keysPressed.up||KeyboardService.keysPressed.down) {
			this.shiftHeroAnimation();
		}
	}.bind(this));
	
}