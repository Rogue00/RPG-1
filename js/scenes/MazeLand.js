MazeLand.prototype = Object.create(Drawable.prototype);
MazeLand.prototype.constructor = Drawable;
	
function MazeLand(width,height,text) {
	Drawable.call(this,width,height,0,0);

	var streetTexture = new Image();
	streetTexture.src = "img/street.jpg";
	streetTexture.addEventListener('load',function() {
		this.needsRedraw = true;
	}.bind(this));
	
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
	
	
	this.userDraw = function() {
		this.context.fillStyle = this.context.createPattern(streetTexture,"repeat");
		this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
		
		this.context.fillStyle = '#fff';	
		this.context.font = '18px verdana';
		this.context.textBaseline = 'top';
		this.context.fillText(text, 30,30);
	}
	
}