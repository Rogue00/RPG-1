Food.prototype = Object.create(PlateContent.prototype);
Food.prototype.constructor = PlateContent;
	
function Food(x,y) {
	PlateContent.call(this,24,24);
	
	var collected = false;
	this.hits = false;
	
	this.getPosition = function() {
		return {
			x: x,
			y: y
		} 
	}
	
	this.handleHit = function(hitObj) {
		if(!collected) {
			collected = true;
			this.needsRedraw = true;
			InventoryService.addItem("food",1);
			DialogService.addMessage("I FOUND SOME MEAT.");
			
		}
	}
	
	this.loop = function() {
	}

	var foodTexture = new Image();
	foodTexture.src = "img/food.png";
	foodTexture.addEventListener('load',function() {
		this.needsRedraw = true;
	}.bind(this));
	
	
	this.draw = function() {
		if(!this.needsRedraw) return;
		this.needsRedraw = false;
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
		if(!collected) {
			this.context.fillStyle = this.context.createPattern(foodTexture,"repeat");
			this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
		}
	}
	
}