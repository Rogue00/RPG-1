Solid.prototype = Object.create(Drawable.prototype);
Solid.prototype.constructor = Drawable;
	
function Solid(x,y,width,height,solidConfig) {
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
        this.context.translate(this.spritePosition.x*this.size.w,this.spritePosition.y*this.size.h);
		this.context.fillStyle = this.context.createPattern(texture,"repeat");
        this.context.fillRect(-this.spritePosition.x*this.size.w,-this.spritePosition.y*this.size.h,this.size.w,this.size.h);
        this.context.restore();
	}
	
}