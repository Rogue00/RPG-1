Fire.prototype = Object.create(Drawable.prototype);
Fire.prototype.constructor = Drawable;

function Fire(x,y) {
	Drawable.call(this,x,y,64,64);

	var locked = false;
	this.handleHit = function(hitObj) {
		if(KeyboardService.keysPressed.space) {
			if(!locked) {
				locked = true;
				if(Inventory.getSelectedItem()!=undefined) {
					switch(Inventory.getSelectedItem().name) {
						case 'uncookedMeat':
							if(Inventory.getQty('uncookedMeat')>0) {
								Inventory.removeItem('uncookedMeat',1);
								Dialog.addMessage("Mmmh... roasted meat.");
								Inventory.addItem('roastedMeat',1);
							}
							break;
						case 'coin':
							Dialog.addMessage("To melt a coin i need something to put it in.");
							break;
						case 'roastedMeat':
							Dialog.addMessage("It's already roasted.");
							break;
						case 'chicken':
							Dialog.addMessage("YIIEK... That doesn't work.");
							break;
						default:
							Dialog.addMessage("I am hungry...");
					}
				} else {
					Dialog.addMessage("Row, Row, Row Your Boat...");	
				}
				setTimeout(function(){locked=false},1000);
			}
			
		}
	}
	
	var fireTexture = new Image();
	fireTexture.src = "img/fire.png";
	fireTexture.addEventListener('load',function() {
		this.needsRedraw = true;
	}.bind(this));
	
	this.userDraw = function() {
		this.context.drawImage(
						fireTexture,
						this.spritePosition.x*this.size.w,
						this.spritePosition.y*this.size.h,
						this.size.w,
						this.size.h,
						0,
						0,
						this.size.w,
						this.size.h
					);
	}
	
	this.shiftFireAnimation = function() {
		if(this.spritePosition.y==1) {
			this.spritePosition.y=0;	
		} else {
			this.spritePosition.y=1;
		}
		this.needsRedraw = true;
	}
	
	setInterval(this.shiftFireAnimation.bind(this),400);
	
}