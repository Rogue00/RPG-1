Fire.prototype = Object.create(PlateContent.prototype);
Fire.prototype.constructor = PlateContent;



function Fire(x,y) {
	PlateContent.call(this,64,64);
	
	var spritePosition = {x:0,y:0};
	
	this.getPosition = function() {
		return {
			x: x,
			y: y
		} 
	}
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
	
	this.loop = function() {
		return this.needsRedraw;
	}

	var fireTexture = new Image();
	fireTexture.src = "img/fire.png";
	fireTexture.addEventListener('load',function() {
		this.needsRedraw = true;
	}.bind(this));
	
	this.draw = function() {
		if(!this.needsRedraw) return;
		this.needsRedraw = false;
		
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
		this.context.drawImage(
						fireTexture,
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
	
	this.shiftFireAnimation = function() {
		if(spritePosition.y==1) {
			spritePosition.y=0;	
		} else {
			spritePosition.y=1;
		}
		this.needsRedraw = true;
	}
	
	setInterval(function() {
			this.shiftFireAnimation();
	}.bind(this),400);
	
}