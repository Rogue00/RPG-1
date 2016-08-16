Solid.prototype = Object.create(Drawable.prototype);
Solid.prototype.constructor = Drawable;
	
function Solid(width,height,x,y,solidConfig) {
	Drawable.call(this,width,height,x,y);

	var texture = new Image();
	texture.src = "img/"+solidConfig.type+".png";
	texture.addEventListener('load',function() {
		this.needsRedraw = true;
		this.draw();
	}.bind(this));
	
	this.userDraw = function() {
		this.context.fillStyle = this.context.createPattern(texture,"repeat");
		this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
	}
	
}