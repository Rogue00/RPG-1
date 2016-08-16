Grassland.prototype = Object.create(Drawable.prototype);
Grassland.prototype.constructor = Drawable;
	
function Grassland(width,height) {
	Drawable.call(this,0,0,width,height);

	var solidConfig = {type:'brick'};
	var collectableConfig = {type:'coin',collectMsg:'cool some coins...'};
	
	var coin = new Collectable(90,90,collectableConfig);
	
	this.tweens.push(TweenService.createTween({
		object: coin,
		repeat: true,
		steps: [
			{x:+120,y:0,d:2000,spritePosition:[0,1]},
			{x:0,y:+120,d:2000,spritePosition:[0,1]},
			{x:-120,y:0,d:2000,spritePosition:[0,1]},
			{x:0,y:-120,d:2000,spritePosition:[0,1]},
		]
	}));
	
	this.colliders = [
		new Solid(width/2,32,0,0,solidConfig),
		new Solid(width/2,32,width/2+32,0,solidConfig),
		new Solid(32,height/2,0,0,solidConfig),
		new Solid(32,height/2,0,height/2+32,solidConfig),
		coin,
		new Fire(height/2-32,height/2-32),
		new Collectable(width/2,height/2,collectableConfig)
	];


	var grassTexture = new Image();
	grassTexture.src = "img/grass.png";
	grassTexture.addEventListener('load',function() {
		this.needsRedraw = true;
	}.bind(this));
	
	this.userDraw = function() {
		this.context.fillStyle = this.context.createPattern(grassTexture,"repeat");
		this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
	}
	
}