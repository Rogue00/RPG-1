Coin.prototype = Object.create(PlateContent.prototype);
Coin.prototype.constructor = PlateContent;
	
function Coin(x,y) {
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
			InventoryService.addItem("coin",1);
			DialogService.addMessage("He found some coins.");
		}
	}
	
	this.loop = function() {
	}

	var coinTexture = new Image();
	coinTexture.src = "img/coin.png";
	coinTexture.addEventListener('load',function() {
		this.needsRedraw = true;
	}.bind(this));
	
	
	this.draw = function() {
		if(!this.needsRedraw) return;
		this.needsRedraw = false;
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
		if(!collected) {
			this.context.fillStyle = this.context.createPattern(coinTexture,"repeat");
			this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
		}
	}
	
}