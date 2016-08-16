Streetland.prototype = Object.create(Drawable.prototype);
Streetland.prototype.constructor = Drawable;
	
var streetTexture = new Image();
streetTexture.src = "img/street.jpg";


function Streetland(width,height,text) {
	Drawable.call(this,width,height,0,0);
	
	streetTexture.addEventListener('load',function() {
		this.needsRedraw = true;
	}.bind(this));
	
	var solidConfig = {type:'brick'};
	var collectableConfig = {type:'uncookedMeat',collectMsg:'some uncooked meat...'};
	
	var guardian = new Solid(32,32,width/2-50,height/2-50,solidConfig);
	
	this.tweens.push(TweenService.createTween({
		object: guardian,
		repeat: true,
		steps: [
			{x:+100,y:0,d:2000},
			{x:0,y:+100,a:-1,d:2000},
			{x:-100,y:0,a:1,d:2000},
			{x:0,y:-100,d:2000},
		]
	}));
	
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
	
	this.userDraw = function() {
		this.context.fillStyle = this.context.createPattern(streetTexture,"repeat");
		this.context.fillRect(0,0,this.canvas.width,this.canvas.height);
		
		this.context.fillStyle = '#fff';	
		this.context.font = '18px verdana';
		this.context.textBaseline = 'top';
		this.context.fillText(text, 30,30);
	}
	
}