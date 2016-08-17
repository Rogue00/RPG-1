Solid.prototype = Object.create(Drawable.prototype);
Solid.prototype.constructor = Drawable;
	
function Solid(width,height,x,y,solidConfig) {
	Drawable.call(this,x,y,width,height);

	this.hits = solidConfig.hits==undefined ? true : solidConfig.hits;
	
	var texture = new Image();
	texture.src = "img/"+solidConfig.type+".png";
	texture.addEventListener('load',function() {
		this.needsRedraw = true;
		this.draw();
	}.bind(this));
	
	this.locked = false;
	
	if(solidConfig.handleHit) {
		this.handleHit = solidConfig.handleHit;	
	}
	
	
	this.userDraw = function() {
		
		this.context.save();
        this.context.translate(this.spritePosition.x*this.canvas.width,this.spritePosition.y*this.canvas.height);
		this.context.fillStyle = this.context.createPattern(texture,"repeat");
        this.context.fillRect(-this.spritePosition.x*this.canvas.width,-this.spritePosition.y*this.canvas.height,this.canvas.width,this.canvas.height);
        this.context.restore();
	}
	
}