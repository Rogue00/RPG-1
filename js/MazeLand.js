MazeLand.prototype = Object.create(PlateContent.prototype);
MazeLand.prototype.constructor = PlateContent;
	



function MazeLand(width,height,text) {
	PlateContent.call(this,width,height,text);

	var streetTexture = new Image();
	streetTexture.src = "img/street.jpg";
	streetTexture.addEventListener('load',function() {
		this.needsRedraw = true;
	}.bind(this));
	
	this.colliders = [
		new Brick(this.canvas.width/2,32,0,0),
		new Brick(this.canvas.width/2,32,this.canvas.width/2+32,0),
		new Brick(32,this.canvas.height/2,0,0),
		new Brick(32,this.canvas.height/2,0,this.canvas.height/2+32),
	];
	
	for(var i=2;i<30;i++) {
		for(var b=3;b<17;b++) {
			if(i%3==0 && b%2!=0) {
				this.colliders.push(new Brick(32,32,i*32,b*32));
			}
		}	
	}
	
	
	this.draw = function() {
		if(!this.needsRedraw) return;
		this.needsRedraw = false;
		
		this.context.fillStyle = this.context.createPattern(streetTexture,"repeat");
		this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
		
		for(var i=0;i<this.colliders.length;i++) {
			this.context.drawImage(this.colliders[i].getCanvas(),this.colliders[i].getPosition().x,this.colliders[i].getPosition().y);	
		}
		
	}
	
}