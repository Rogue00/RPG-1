Grassland.prototype = Object.create(Drawable.prototype);
Grassland.prototype.constructor = Drawable;
	
function Grassland(width,height,text) {
	Drawable.call(this,width,height,0,0);
	
	var grassTexture = new Image();
	grassTexture.src = "img/grass.png";
	grassTexture.addEventListener('load',function() {
		this.needsRedraw = true;
	}.bind(this));
	
	var solidConfig = {type:'brick'};
	var collectableConfig = {type:'coin',collectMsg:'cool some coins...'};
	
	var coin = new Collectable(90,90,collectableConfig);
	
	this.tweens.push(TweenService.createTween({
		object: coin,
		repeat: false,
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
	
	this.userDraw = function() {
		this.context.fillStyle = this.context.createPattern(grassTexture,"repeat");
		this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
		
		this.context.fillStyle = '#fff';	
		this.context.font = '18px verdana';
		this.context.textBaseline = 'top';
		this.context.fillText(text, 30,30);
	}
	
}