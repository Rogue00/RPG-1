Fire.prototype = Object.create(Drawable.prototype);
Fire.prototype.constructor = Drawable;

function Fire(x,y) {
	Drawable.call(this,64,64,x,y);

	var locked = false;
	this.handleHit = function(hitObj) {
		if(KeyboardService.keysPressed.space) {
			if(!locked) {
				locked = true;
				if(InventoryService.getSelectedItem()!=undefined) {
					switch(InventoryService.getSelectedItem().name) {
						case 'uncookedMeat':
							if(InventoryService.getQty('uncookedMeat')>0) {
								InventoryService.removeItem('uncookedMeat',1);
								DialogService.addMessage("Mmmh... roasted meat.");
								InventoryService.addItem('roastedMeat',1);
							}
							break;
						case 'coin':
							DialogService.addMessage("To melt a coin i need something to put it in.");
							break;
						case 'roastedMeat':
							DialogService.addMessage("It's already roasted.");
							break;
						case 'chicken':
							DialogService.addMessage("YIIEK... That doesn't work.");
							break;
						default:
							DialogService.addMessage("I am hungry...");
					}
				} else {
					DialogService.addMessage("Row, Row, Row Your Boat...");	
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
	
	this.shiftFireAnimation = function() {
		if(this.spritePosition.y==1) {
			this.spritePosition.y=0;	
		} else {
			this.spritePosition.y=1;
		}
		this.needsRedraw = true;
	}
	
	setInterval(function() {
			this.shiftFireAnimation();
	}.bind(this),400);
	
}