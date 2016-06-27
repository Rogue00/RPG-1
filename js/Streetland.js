Streetland.prototype = Object.create(PlateContent.prototype);
Streetland.prototype.constructor = PlateContent;
	
var streetTexture = new Image();
streetTexture.src = "img/street.jpg";


function Streetland(width,height) {
	PlateContent.call(this,width,height);
	
	streetTexture.addEventListener('load',function() {
		this.needsRedraw = true;
	}.bind(this));
	
	this.needsRedraw = false;
	
	this.colliders = [
		new Brick(width/2,32,0,0),
		new Brick(width/2,32,width/2+32,0),
		new Brick(32,height/2,0,0),
		new Brick(32,height/2,0,height/2+32),
		new Brick(100,100,200,100),
		new Brick(100,100,700,100),
		new Brick(100,100,200,400),
		new Brick(100,100,700,400),
		new Food(width/2,height/2)
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
		this.context.fillStyle = this.context.createPattern(streetTexture,"repeat");
		this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
		
		for(var i=0;i<this.colliders.length;i++) {
			this.context.drawImage(this.colliders[i].getCanvas(),this.colliders[i].getPosition().x,this.colliders[i].getPosition().y);	
		}
		
	}
	
}