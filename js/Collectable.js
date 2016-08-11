Collectable.prototype = Object.create(PlateContent.prototype);
Collectable.prototype.constructor = PlateContent;
	
function Collectable(x,y,itemConfig) {
	PlateContent.call(this,24,24,x,y);
	
	var collected = false;
	this.hits = itemConfig.hits||false;
	
	if(!itemConfig.handleHit) {
		this.handleHit = function(hitObj) {
			if(!collected) {
				collected = true;
				this.needsRedraw = true;
				InventoryService.addItem(itemConfig.type,1);
				DialogService.addMessage(itemConfig.collectMsg);
			}
		}
	} else {
		this.handleHit = itemConfig.handleHit;
	}
	
	var texture = new Image();
	texture.src = "img/"+itemConfig.type+".png";
	texture.addEventListener('load',function() {
		this.needsRedraw = true;
	}.bind(this));
	
	
	this.draw = function() {
		if(!this.needsRedraw) return;
		this.needsRedraw = false;
		this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
		if(!collected) {
			this.context.fillStyle = this.context.createPattern(texture,"repeat");
			this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
		}
	}
	
}