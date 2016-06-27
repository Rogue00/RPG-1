Grassland.prototype = Object.create(PlateContent.prototype);
Grassland.prototype.constructor = PlateContent;
	
function Grassland(width,height,text) {
	PlateContent.call(this,width,height,text);
	
	var grassTexture = new Image();
	grassTexture.src = "img/grass.png";
	grassTexture.addEventListener('load',function() {
		this.needsRedraw = true;
	}.bind(this));
	
	this.colliders = [
		new Brick(this.canvas.width/2,32,0,0),
		new Brick(this.canvas.width/2,32,this.canvas.width/2+32,0),
		new Brick(32,this.canvas.height/2,0,0),
		new Brick(32,this.canvas.height/2,0,this.canvas.height/2+32),
		new Fire(this.canvas.height/2-32,this.canvas.height/2-32)
	];
	
	this.draw = function() {
		for(var i=0;i<this.colliders.length;i++) {
			this.colliders[i].draw();
		}
		if(!this.needsRedraw) return;
		this.needsRedraw = false;
		
		this.context.fillStyle = this.context.createPattern(grassTexture,"repeat");
		this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
		
		for(var i=0;i<this.colliders.length;i++) {
			this.context.drawImage(this.colliders[i].getCanvas(),this.colliders[i].getPosition().x,this.colliders[i].getPosition().y);	
		}
		
	}
	
}