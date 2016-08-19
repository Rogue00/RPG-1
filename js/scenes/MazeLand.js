MazeLand.prototype = Object.create(Drawable.prototype);
MazeLand.prototype.constructor = Drawable;
	
function MazeLand(width,height) {
	Drawable.call(this,0,0,width,height);
	
	var solidConfig = {type:'brick'};
	this.colliders = [
		new Solid(width/2,32,0,0,solidConfig),
		new Solid(width/2,32,width/2+32,0,solidConfig),
		new Solid(32,height/2,0,0,solidConfig),
		new Solid(32,height/2,0,height/2+32,solidConfig),
	];
	
	for(var i=2;i<30;i++) {
		for(var b=3;b<17;b++) {
			if(i%3==0 && b%2!=0) {
				this.colliders.push(new Solid(32,32,i*32,b*32,solidConfig));
			}
		}	
	}
	
	var streetTexture = new Image();
	streetTexture.src = "img/street.jpg";
	streetTexture.addEventListener('load',function() {
		this.needsRedraw = true;
	}.bind(this));
	
	this.userDraw = function() {
		this.context.fillStyle = this.context.createPattern(streetTexture,"repeat");
		this.context.fillRect(0,0,this.size.w,this.size.h);
	}
	
}