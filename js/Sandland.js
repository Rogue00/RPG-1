Sandland.prototype = Object.create(PlateContent.prototype);
Sandland.prototype.constructor = PlateContent;
	
var sandTexture = new Image();
sandTexture.src = "img/grass.png";


function Sandland(width,height) {
	PlateContent.call(this,width,height);
	
	sandTexture.addEventListener('load',function() {
		this.needsRedraw = true;
	}.bind(this));
	
	this.colliders = [
		new Brick(this.canvas.width/2,32,0,0),
		new Brick(this.canvas.width/2,32,this.canvas.width/2+32,0),
		new Brick(32,this.canvas.height/2,0,0),
		new Brick(32,this.canvas.height/2,0,this.canvas.height/2+32),
	];
	
	this.draw = function() {
		if(!this.needsRedraw) return;
		this.needsRedraw = false;
		
		this.context.fillStyle = this.context.createPattern(sandTexture,"repeat");
		this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
		
		for(var i=0;i<this.colliders.length;i++) {
			this.context.drawImage(this.colliders[i].getCanvas(),this.colliders[i].getPosition().x,this.colliders[i].getPosition().y);	
		}
		
	}
	
}