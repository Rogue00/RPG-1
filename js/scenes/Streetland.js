Streetland.prototype = Object.create(Drawable.prototype);
Streetland.prototype.constructor = Drawable;
	



function Streetland(width,height) {
	Drawable.call(this,0,0,width,height);
	
	var solidConfig = {type:'brick'};
	var collectableConfig = {type:'uncookedMeat',collectMsg:'some uncooked meat...'};
	
	var guardian = new Solid(width/2-50,height/2-50,32,32,solidConfig);
	
	this.tweens.push(TweenService.createTween({
		object: guardian,
		repeat: true,
		steps: [
			{x:+100,y:0,d:2000},
			{d:2000},
			{x:0,y:+100,a:-1,d:2000},
			{x:-100,y:0,a:1,d:2000},
			{x:0,y:-100,d:2000},
		]
	}));
	
	this.colliders = [
		new Solid(0,0,width/2,32,solidConfig),
		new Solid(width/2+32,0,width/2,32,solidConfig),
		new Solid(0,0,32,height/2,solidConfig),
		new Solid(0,height/2+32,32,height/2,solidConfig),
		new Solid(200,100,100,100,solidConfig),
		new Solid(700,100,100,100,solidConfig),
		new Solid(200,400,100,100,solidConfig),
		new Solid(700,400,100,100,solidConfig),
		new Collectable(width/2,height/2,24,24,collectableConfig),
		guardian
	];
	
	
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