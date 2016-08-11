Streetland.prototype = Object.create(PlateContent.prototype);
Streetland.prototype.constructor = PlateContent;
	
var streetTexture = new Image();
streetTexture.src = "img/street.jpg";


function Streetland(width,height) {
	PlateContent.call(this,width,height);
	
	streetTexture.addEventListener('load',function() {
		this.needsRedraw = true;
	}.bind(this));
	
	var solidConfig = {type:'brick'};
	var collectableConfig = {type:'uncookedMeat',collectMsg:'some uncooked meat...'};
	
	var guardian = new Solid(32,32,width/2-50,height/2-50,solidConfig);
	
	TweenService.addTween({
		object: guardian,
		repeat: true,
		steps: [
			{x:+100,y:0,d:2000},
			{x:0,y:+100,d:2000},
			{x:-100,y:0,d:2000},
			{x:0,y:-100,d:2000},
		]
	})
	
	this.colliders = [
		new Solid(width/2,32,0,0,solidConfig),
		new Solid(width/2,32,width/2+32,0,solidConfig),
		new Solid(32,height/2,0,0,solidConfig),
		new Solid(32,height/2,0,height/2+32,solidConfig),
		new Solid(100,100,200,100,solidConfig),
		new Solid(100,100,700,100,solidConfig),
		new Solid(100,100,200,400,solidConfig),
		new Solid(100,100,700,400,solidConfig),
		new Collectable(width/2,height/2,collectableConfig),
		guardian
	];
	
	this.loop = function() {
		for(var i=0;i<this.colliders.length;i++) {
			this.colliders[i].loop();
			if(this.colliders[i].needsRedraw) {
				this.needsRedraw = true;
			}
		}
		return this.needsRedraw;
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
			this.context.drawImage(this.colliders[i].canvas,this.colliders[i].getPosition().x,this.colliders[i].getPosition().y);	
		}
		
	}
	
}