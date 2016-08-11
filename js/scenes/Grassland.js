Grassland.prototype = Object.create(PlateContent.prototype);
Grassland.prototype.constructor = PlateContent;
	
function Grassland(width,height,text) {
	PlateContent.call(this,width,height,text);
	
	var grassTexture = new Image();
	grassTexture.src = "img/grass.png";
	grassTexture.addEventListener('load',function() {
		this.needsRedraw = true;
	}.bind(this));
	
	var solidConfig = {type:'brick'};
	var collectableConfig = {type:'coin',collectMsg:'cool some coins...'};
	
	var coin = new Collectable(90,90,collectableConfig);
	
	TweenService.addTween({
		object: coin,
		repeat: true,
		steps: [
			{x:+120,y:0,d:2000,spritePosition:[0,1]},
			{x:0,y:+120,d:2000,spritePosition:[0,1]},
			{x:-120,y:0,d:2000,spritePosition:[0,1]},
			{x:0,y:-120,d:2000,spritePosition:[0,1]},
		]
	})
	
	this.colliders = [
		new Solid(width/2,32,0,0,solidConfig),
		new Solid(width/2,32,width/2+32,0,solidConfig),
		new Solid(32,height/2,0,0,solidConfig),
		new Solid(32,height/2,0,height/2+32,solidConfig),
		coin,
		new Fire(height/2-32,height/2-32),
		new Collectable(width/2,height/2,collectableConfig)
	];
	
	this.loop = function() {
		for(var i=0;i<this.colliders.length;i++) {
			if(this.colliders[i].needsRedraw) {
				this.needsRedraw = true;
			}
			this.colliders[i].loop();
		}
		return this.needsRedraw;
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
			this.context.drawImage(this.colliders[i].canvas,this.colliders[i].getPosition().x,this.colliders[i].getPosition().y);	
		}
		
	}
	
}