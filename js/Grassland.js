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
		new Brick(width/2,32,0,0),
		new Brick(width/2,32,width/2+32,0),
		new Brick(32,height/2,0,0),
		new Brick(32,height/2,0,height/2+32),
		new Fire(height/2-32,height/2-32),
		new Coin(width/2,height/2)
	];
	
	this.loop = function() {
		for(var i=0;i<this.colliders.length;i++) {
			if(this.colliders[i].needsRedraw) {
				this.needsRedraw = true;
			}
			this.colliders[i].loop();
		}
	}
	
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