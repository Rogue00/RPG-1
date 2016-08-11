Solid.prototype = Object.create(PlateContent.prototype);
Solid.prototype.constructor = PlateContent;
	
function Solid(width,height,x,y,solidConfig) {
	PlateContent.call(this,width,height,x,y);

	var texture = new Image();
	texture.src = "img/"+solidConfig.type+".png";
	texture.addEventListener('load',function() {
		this.needsRedraw = true;
		this.draw();
	}.bind(this));
	
	this.draw = function() {
		if(!this.needsRedraw) return;
		this.needsRedraw = false;
		this.context.fillStyle = this.context.createPattern(texture,"repeat");
		this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
	}
	
}