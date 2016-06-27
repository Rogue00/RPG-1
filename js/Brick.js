Brick.prototype = Object.create(PlateContent.prototype);
Brick.prototype.constructor = PlateContent;
	



function Brick(width,height,x,y) {
	PlateContent.call(this,width,height);
	
	this.loop = function() {
		
	}
	
	this.getPosition = function() {
		return {
			x: x,
			y: y
		}
	} 

	var brickTexture = new Image();
	brickTexture.src = "img/brick.png";
	brickTexture.addEventListener('load',function() {
		this.needsRedraw = true;
		this.draw();
	}.bind(this));
	
	this.draw = function() {
		if(!this.needsRedraw) return;
		this.needsRedraw = false;
		this.context.fillStyle = this.context.createPattern(brickTexture,"repeat");
		this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
	}
	
}